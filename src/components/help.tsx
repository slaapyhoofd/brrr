interface IHelpProps {
  open: boolean;
  setOpen(open: boolean): void;
}

export const Help = ({ open, setOpen }: IHelpProps) => (
  <dialog id="modal-help" open={open}>
    <article>
      <header>
        <a href="#close" aria-label="Close" className="close" onClick={() => setOpen(false)} />
        Help
      </header>
      <h3>General</h3>
      <p>
        Welcome to the incredible world of BRRRR-NFC. Brought to life at 755550 by the wonderful
        team of the <a href="https://youtu.be/zVYvrQhiWUU">Connect the World Podcast</a>. As the
        very first web version in bitcoinland I will help you to <b>batchwise</b> set up everything
        you need to produce a bunch of neat Lightning NFC-Cards for your event. And I am awesome in
        doing so. Seriously. Machines set up, where your customers can pay via Lightning and NFC and
        now you need those cards ? Want to offer some Voucher or tipping NFC Cards for your event ?
        Note: NFCCards with NTAG 216 can carry just 1 written link - usually this would be the one
        to pay with. But that´s not enough, right ? To be able to refill the card or see the balance
        NFC-BRRR can generate stickers carrying an Import-Key for e.g. BlueWallet for each card. Put
        the right(!) sticker on each card or a corresponding flyer and your guests are set to use
        some juice- or beertaps ! Let´s get your wallets and stickerfile ready and BRRRR some cards
        !
      </p>

      <h3>LNBits</h3>
      <p>
        LNbits is a godswork open source accounting-app build by various wonderful people and has
        lots of extensions and helpful features for developers. You can run LNbits as a separate
        accounting on your lightning node. Alternatively you can use the custodian version of the
        official <a href="https://legend.lnbits.com">Legend LNbits</a> at your own risk. You already
        run a node and LNbits is installed{' '}
        <a href="https://github.com/TrezorHannes/vps-lnbits">in clearnet</a> already? Lets go! You
        will need to connect me to an LNbits instance to register a bunch of wallets and all those
        links there. Each wallet represents a card - and each card represents a future proud pleb 😄
        For each of those wallets i will generate the relevant links a voucher-/cardholder needs to
        - deposit (Receive, Deposit, LNURLp, ..) - payment (Send, Pay, LNURLw, ..) - Import to e.g.
        BlueWallet (LNauth, Admin-Key)
      </p>

      <h3>lnurl</h3>
      <p>
        LNURL enables very smooth end-user experiences in the Lightning Network. It was brought to
        life by <a href="https://twitter.com/fiatjaf">fiatjaf</a> and is a side channel
        communication protocol with subprotocols representing specific UX flows.
      </p>

      <h3>LNbits URL</h3>
      <p>
        Official URL of LNbits instance that has to be{' '}
        <a href="https://github.com/TrezorHannes/vps-lnbits">in clearnet</a>. No, you are not
        getting around this 🤠
      </p>

      <h3>Info Sticker</h3>
      <p>
        To enable the cardholder to import his wallet in e.g. BlueWallet and see the balance or to
        refill the card, we need to print an individual QR-code for each card. This can be
        transported either as a sticker attached to the card or on a flyer that goes with them. Take
        good care to take the right one for the relevant card! To help you not messing things up,
        the Prefix and card number as well as the Sticker-QR are shown crossover, whenever we are
        writing something for your project. You´re welcome 😆
      </p>

      <h3>LNBits admin id</h3>
      <p>
        Open LNbits and create a wallet. To the right you will find a section called API-Info. If
        you click it, it will bring up the relevant IDs. Copy to use them here.
      </p>

      <h3>LNBits read key</h3>
      <p>
        Open LNbits and create a wallet. To the right you will find a section called API-Info. If
        you click it, it will bring up the relevant IDs. Copy to use them here.
      </p>

      <h3>Name prefix</h3>
      <p>
        Recommended to keep track of different projects. The prefix will be used for all filenames
        as well as for the general identification of your cards and links.
      </p>

      <h3>Message</h3>
      <p>
        &quot;Brought to you by @youreventname&quot; or just something like &quot;Thank you!&quot;.
        Will be shown on all Terminals, that support messages to the recipient of the NFC-payment.
      </p>

      <h3>Webhook</h3>
      <p>
        Insert a URL to be directed to when a payment is successful. Webhooks allow all sorts of
        neat ideas apart from a &quot;Thank You&quot; page. For example you could send a ticket-file
        back, an authentication-key and you could even start a relay with it that turns on a sound
        whenever someone paid with the card using the{' '}
        <a href="https://github.com/arcbtc/bitcoinSwitch">bitcoinswitch-repo</a>.
        <a href="https://t.me/connect_the_world">Let us know</a>, what you did with it!
      </p>
    </article>
  </dialog>
);
