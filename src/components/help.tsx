interface IHelpProps {
  open: boolean;
  setOpen(open: boolean): void;
}

export const Help = ({ open, setOpen }: IHelpProps) => (
  <dialog id="modal-help" open={open}>
    <article>
      <header>
        <a href="#close" aria-label="Close" className="close" onClick={() => setOpen(false)} />
        Need help?
      </header>
      <h3>Let me explain a bit.</h3>
      <p>
        <b>Welcome to the incredible world of BRRR-NFC! </b>I was brought to life at 755550 by the
        wonderful team of the <a href="https://youtu.be/zVYvrQhiWUU">Connect the World Podcast</a>.
        We want this tool to be helpful to everyone, that wants to bring Lightning cards to their
        event in an ease - may it be a birthday party, a meetup or a conference.
        <br />
        As the very first web version in bitcoinland I will help you to set up everything you need
        to produce a neat bunch of Lightning NFC-Cards for your guests. <br />
        And I am awesome in doing so. Seriously.
      </p>
      <p>
        <b>
          What I will do for you: - Batchwise create wallets and all their links you need
          <br />
          - Fund the cards with your LNbits wallet
          <br />
          - Write the chosen link onto a bunch of cards
          <br />
          - Fill a sticker-template with chosen link (Avery 25x25-S)
          <br />
          - *Soon: upload a design and order your cards online*
          <br />
        </b>
      </p>
      <p>
        Notes: <br />
        - To prevent trouble with AML rules you may not sell the cards. It is recommended to let
        them expire short time after your event. <br />
        - Therefore we do not lock the cards, which allows a cardholder to overwrite it with an own
        wallet. Thats the way. <br />
        - NFCCards with NTAG 216 can carry just 1 written link which usually is the one to pay with.
        But thats not enough, right? To be able to refill the card or see the balance, NFC-BRRR can
        generate stickers carrying an Import-Key for e.g. BlueWallet per each card. Put the right(!)
        sticker on each card or a corresponding flyer and your guests are set to endlessly use some
        vending machines or beertaps!
        <br />
        Do you have your machines set up, that your customers can pay with bitcoin via Lightning?{' '}
        <br />
        Lets get your wallets and stickers ready and BRRRR some cards!
      </p>

      <h3>LNBits</h3>
      <p>
        <a href="https://lnbits.com/">LNbits</a> is a godswork open source accounting-app that has
        lots of extensions with helpful features for LNURL developers. <br />
        You can run LNbits as a separate accounting system on your lightning node. Alternatively you
        can use the custodian version of the official{' '}
        <a href="https://legend.lnbits.com">Legend LNbits</a> at your own risk.
        <br />
        You already run a node and LNbits is installed{' '}
        <a href="https://github.com/TrezorHannes/vps-lnbits">in clearnet</a> ? Good job! Now connect
        me to your LNbits to register a bunch of wallets and all those links there, that you need.
        <br />
        For the cards and stickers you can choose to use a link to
        <br />
        - deposit (often referred to as Receive, Deposit, LNURLp, ..)
        <br />
        - pay (Send, Pay, LNURLw, ..)
        <br />
        - Import to e.g. BlueWallet (LNDhub)
        <br />
        Thanks for using me!
      </p>

      <h3>LNBits Admin key & User ID</h3>
      <p>
        Open LNbits and create a funding wallet for the cards. To the right you will find a section
        called API-Info. If you click it, it will bring up the admin key. Your admin User ID can be
        found by opening My Account from the top right user icon. The User ID can be made visible by
        clicking on the eye icon after which you can copy it.
        <br />
        <b>Make sure this wallet has enough satoshis loaded before proceeding. </b>
      </p>

      <h3>LNURL</h3>
      <p>
        LNURL enables very smooth end-user experiences in the Lightning Network. It was brought to
        life by <a href="https://twitter.com/fiatjaf">fiatjaf</a> and is a side channel
        communication protocol with subprotocols representing specific UX flows. From those we are
        e.g. using LNURLw to deposit and LNURLp to enable payments with the card.
        <br />
        Have a look at some LNURL-machines from builders around the globe at{' '}
        <a href="https://github.com/fiatjaf/awesome-lnurl">awesome LNURL</a>.
      </p>

      <h3>Sticker?</h3>
      <p>
        To enable a cardholder to import the wallet in e.g. BlueWallet and see the balance OR to
        just be able to refill the card, we need to generate an individual QR-code. This can become
        either a sticker attached to the card itself.
        <br />
        Think twice about putting the import-code here instead of the one to refill the card. You
        would not want videos of this code on Social Media.. Rather stick the admin-key to a flyer
        that goes with each card and/or the deposit-link to the sticker on the card. Whatever you
        do, take good care to take the right one! To help you not messing things up with those three
        possible options, the prefix and card number is shown crossover, whenever we are brrring
        something for your project.
      </p>

      <h3>Name prefix</h3>
      <p>
        Recommended to keep track of different projects. The prefix will be used for all filenames
        as well as for the general identification of your cards and sticker.
      </p>

      <h3>Webhook</h3>
      <p>
        Insert a URL to be directed to when a payment is successful. Webhooks allow all sorts of
        funky ideas apart from a &quot;Thank You&quot; page. You could instead send a ticket-file
        back, an authentication-key or you could start a relais with it that turns on a sound
        whenever someone paid with the card using the{' '}
        <a href="https://github.com/arcbtc/bitcoinSwitch">bitcoinswitch-repo</a>.<br />
        <a href="https://t.me/connect_the_world">Let us know</a>, what you did with it!
      </p>
    </article>
  </dialog>
);
