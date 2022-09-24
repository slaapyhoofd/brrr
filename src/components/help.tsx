import * as React from 'react';

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
        Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue finibus pellentesque.
        Nullam finibus risus non semper euismod.
      </p>
      <h3>LNBits</h3>
      <p>
        Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue finibus pellentesque.
        Nullam finibus risus non semper euismod.
      </p>
      <h3>lnurl</h3>
      <p>
        Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue finibus pellentesque.
        Nullam finibus risus non semper euismod.
      </p>
    </article>
  </dialog>
);
