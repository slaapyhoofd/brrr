import { useState } from 'react';
import { Help } from './help';

export const Header = () => {
  const [open, setOpen] = useState(false);
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
      <p>Batch create and and write LNbits wallets to NFC tags for your event! Brrr...</p>
      <Help open={open} setOpen={(o) => setOpen(o)} />
    </>
  );
};
