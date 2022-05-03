import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import Title from './Title';

function Help() {
  const showModal = () => {
    const modal = document.querySelector('#help-modal');
    modal.showModal();
  };

  const closeModal = () => {
    const modal = document.querySelector('#help-modal');
    modal.close();
  };

  return (
    <>
      <FaQuestionCircle className="absolute top-6 right-6 hover:cursor-pointer" onClick={showModal} />
      <dialog id="help-modal" className="w-4/5 md:w-2/5 relative">
        <Title>Bantuan</Title>
        <GrClose className="absolute top-5 right-5 hover:cursor-pointer" onClick={closeModal} />
        <div className="text-xs md:text-base">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cux
            velit excepturi sed vitae, eius, reiciendis adipisci libero officiis
            consequuntur quibusdam expedita autem corrupti, est quam repellat
            placeat veniam ab? Labore.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cux
            velit excepturi sed vitae, eius, reiciendis adipisci libero officiis
            consequuntur quibusdam expedita autem corrupti, est quam repellat
            placeat veniam ab? Labore.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cux
            velit excepturi sed vitae, eius, reiciendis adipisci libero officiis
            consequuntur quibusdam expedita autem corrupti, est quam repellat
            placeat veniam ab? Labore.
          </p>
        </div>
      </dialog>
    </>
  );
}

export default Help;
