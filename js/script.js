console.log('Warsztat - Infinite scroll');

let endOfThePage = 0;

let preloading = false;

const showPreloader = () => {

  let preloader = document.getElementById(`preloader`);
  console.log('showPreloader');
  preloader.style.display = 'block';
  preloading = true;
}



const hidePreloader = () => {

  let preloader = document.getElementById(`preloader`);
  console.log('hidePreloader');
  preloader.style.display = 'none';
  preloading = false;
}

const getData = () => {

  if (!preloading) {

    showPreloader();
    };
    // console.log('getData()');
    fetch('https://akademia108.pl/api/ajax/get-users.php')
      .then(res => res.json())
      .then(data => {
  
        let body = document.body;
        let hr = document.createElement('hr');
        body.appendChild(hr);
  
  
        for (let user of data) {
            let pID = document.createElement('p');
            let pName = document.createElement('p');
            let pWebsite = document.createElement('p');
  
            pID.innerText = `User ID: ${user.id}`;
            pName.innerText = `User Name: ${user.name}`;
            pWebsite.innerHTML = `User URL: ${user.website}<br />--------`;
  
           
            body.appendChild(pID);
            body.appendChild(pName);
            body.appendChild(pWebsite);
        }
  
        preloading = false;
        hidePreloader();
  
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  
  preloading = true; 
  // console.log('getData()');
  fetch('https://akademia108.pl/api/ajax/get-users.php')
    .then(res => res.json())
    .then(data => {

      let body = document.body;
      let hr = document.createElement('hr');
      body.appendChild(hr);


      for (let user of data) {
          let pID = document.createElement('p');
          let pName = document.createElement('p');
          let pWebsite = document.createElement('p');

          pID.innerText = `User ID: ${user.id}`;
          pName.innerText = `User Name: ${user.name}`;
          pWebsite.innerHTML = `User URL: ${user.website}<br />--------`;

         
          body.appendChild(pID);
          body.appendChild(pName);
          body.appendChild(pWebsite);
      }

      hidePreloader();

      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}

const scrollToEndPage = () => {
 
  let d = document.documentElement;

  //hight of an element's content, including content not visible on the screen

  let scrollHeight = d.scrollHeight;

  // number of pixels that an element's content is scrolled vertically
  let scrollTop = d.scrollTop;

// inner hight of an element in pixels
  let clientHeight = d.clientHeight;

  let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

  console.log(`scrollHeight: ${scrollHeight}`);
  console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
  console.log(`scrollTop: ${scrollTop}`);
  console.log(`clientHeight: ${clientHeight}`);
  console.log(`==================================`);



  if (sumScrollTopClientHeight >= scrollHeight) {

    endOfThePage +=1;

    console.log(`Scrolled to the end of page: ${endOfThePage}`);


    getData();
  }


}

window.addEventListener('scroll', scrollToEndPage);
