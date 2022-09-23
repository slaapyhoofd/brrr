export enum ErrorReason {
  unavailable,
  aborted,
  scanInProgress,
  permissionDenied,
  readingError,
  noLnurlFound,
  tagNotEmpty,
}

export class LnurlWriter {
  private readonly ndefReader?: NDEFReader;
  private ignoreRead = false;
  private scanning = false;

  constructor() {
    // Checks if Web NFC is present
    if ('NDEFReader' in window) {
      // @ts-ignore
      this.ndefReader = new window.NDEFReader();
    }
  }

  /**
   * Tries to read a NFC tag an write the provided lnurl to it if empty.
   * @param url the lnurl that should be written.
   */
  public async writeUrl(url: string): Promise<void> {
    try {
      if (!this.ndefReader) {
        return Promise.reject(ErrorReason.unavailable);
      }

      this.ignoreRead = false;
      this.ndefReader.onreading = (event) => {
        if (this.ignoreRead) {
          // write pending, ignore read.
          return;
        }
      };

      this.ndefReader.onreadingerror = () => Promise.reject(ErrorReason.readingError);

      if (!this.scanning) {
        await this.ndefReader.scan();
        this.scanning = true;
      }

      const lnurl = url.startsWith('lightning:') ? url : `lightning:${url}`;
      return this.write(lnurl);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Tries to write the provided lnurl to a NFC tag if it's empty.
   * @param url the lnurl that should be written.
   */
  private async write(url: string): Promise<void> {
    this.ignoreRead = true;

    return new Promise((resolve, reject) => {
      if (!this.ndefReader) {
        return reject(ErrorReason.unavailable);
      }

      this.ndefReader.addEventListener(
        'reading',
        async (event) => {
          if (!this.ndefReader) {
            return reject(ErrorReason.unavailable);
          }

          // Check if we want to write to this tag, or reject.
          if (
            (event as NDEFReadingEvent)?.message?.records?.length > 0 &&
            (event as NDEFReadingEvent)?.message.records[0]?.recordType !== 'empty'
          ) {
            return reject(ErrorReason.tagNotEmpty);
          }

          // finally write
          try {
            await this.ndefReader.write({
              records: [{ recordType: 'url', data: url }],
            });
            resolve();
          } catch (e) {
            reject(ErrorReason.readingError);
          } finally {
            this.ignoreRead = false;
          }
        },
        { once: true },
      );
    });
  }
}
