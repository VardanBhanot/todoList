const FILES_TO_CACHE = [
    './index.html',
    './fonts',
    './app.js',
    './styles.css'
  ];


  self.addEventListener('install',evt =>{
    console.log('service workor has been installed');
  });

 

 self.addEventListener('activate',evt =>{
   console.log('service worker has been activated');
 }) ;


 self.addEventListener('fetch',evt =>{
   console.log("fetch");
 })

