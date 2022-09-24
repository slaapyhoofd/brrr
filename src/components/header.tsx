import * as React from 'react';
import { Help } from './help';

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav>
        <ul>
          <li>
            <strong>nfc-brrr-machine</strong>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#" role="button" className="outline" onClick={() => setOpen(true)}>
              Help
            </a>
          </li>
        </ul>
      </nav>
      <p>
        Batch create wallets in LNbits, enable the necessary plugins, and batch write the lnurlw to
        the NFC tag! Brrr...
      </p>
      <Help open={open} setOpen={(o) => setOpen(o)} />
    </>
  );
};
