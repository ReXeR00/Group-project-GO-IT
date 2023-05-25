import * as basicLightbox from 'basiclightbox';

import Emil from '../images/team/Emil.jpg';
import Julita from '../images/team/Julita.jpg';
import Szymon from '../images/team/Szymon.png';
import Karol from '../images/team/Karol.png';
import Bartosz from '../images/team/Bartosz.jpg';
import Dorota from '../images/team/Dorota.jpg';
import Anna from '../images/team/Anna.jpg';
import Weronika from '../images/team/Weronika.jpg';

const inserttohtml = `<div class="team-wrapper">       
          <div class="member-card">
            <img src="${Emil}" alt="Emil" class="member-image" loading="lazy">
            <p class="member-name">Emil</p>
            <p class="member-name">Nowak</p>
            <p class="member-role">Team Leader</p>
           
          </div>
          <div class="member-card">
            <img src="${Julita}" alt="Julita" class="member-image" loading="lazy">
            <p class="member-name">Julita</p>
            <p class="member-name">Dworak-Tołłoczko</p>
            <p class="member-role">Scrum Master</p>
            
          </div>
          <div class="member-card">
              <img src="${Szymon}" alt="Szymon" class="member-image" loading="lazy">
              <p class="member-name">Szymon</p>
              <p class="member-name">Opończewski</p>
              <p class="member-role">Developer</p>
              
          </div>
          <div class="member-card">
              <img src="${Karol}" alt="Karol" class="member-image" loading="lazy">
              <p class="member-name">Karol</p>
              <p class="member-name">Kowalewicz</p>
              <p class="member-role">Developer</p>
             
          </div>
          <div class="member-card">
              <img src="${Bartosz}" alt="Bartosz" class="member-image" loading="lazy">
              <p class="member-name">Bartosz</p>
              <p class="member-name">Szkiłądź</p>
              <p class="member-role">Developer</p>
             
          </div>
          <div class="member-card">
              <img src="${Dorota}" alt="Dorota" class="member-image" loading="lazy">
              <p class="member-name">Dorota</p>
              <p class="member-name">Bednarczyk</p>
              <p class="member-role">Developer</p>
             
          </div>
          <div class="member-card">
              <img src="${Anna}" alt="Anna" class="member-image" loading="lazy">
              <p class="member-name">Anna</p>
              <p class="member-name">Jasińska</p>
              <p class="member-role">Developer</p>
              
          </div>
          <div class="member-card">
              <img src="${Weronika}" alt="Weronika" class="member-image" loading="lazy">
              <p class="member-name">Weronika</p>
              <p class="member-name">Szymaniak</p>
              <p class="member-role">Developer</p>
           </div>  
</div>`;

const teamButton = document.querySelector('.js-team-modal');

teamButton.addEventListener('click', openModal);
console.log(teamButton);

function openModal(e) {
  const closeModalHandler = e => {
    if (e.code === 'Escape') {
      modal.close();
    }
    //if (e.event.target.parentNode.parentNode.className != 'team-wrapper') modal.close();
  };

  const modal = basicLightbox.create(inserttohtml, {
    onShow: () => {},
    onClose: () => {
      window.removeEventListener('keydown', closeModalHandler);
    },
  });

  modal.show();
  window.addEventListener('keydown', closeModalHandler);
  /*   window.addEventListener('click', event => {
    console.log('event.target: ', event.target.parentNode.parentNode.className);
    //console.log('event.currentTarget: ', event.currentTarget);
  }); */
}
