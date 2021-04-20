const dropZone=document.querySelector('.dropbox');
const fileOpener= document.querySelector('#fileopener');
const file_selector_btn=document.querySelector('.file_selector_btn');

const host="https://share--x.herokuapp.com/";
const uploadURL=host+"api/file";

dropZone.addEventListener('dragover',(e)=>{
    e.preventDefault();

    if(!dropZone.classList.contains('dragged'))
        dropZone.classList.add('dragged')
})

dropZone.addEventListener('dragleave',(e)=>{
    if(dropZone.classList.contains('dragged'))
        dropZone.classList.remove('dragged');
})

dropZone.addEventListener('drop',(e)=>{
    e.preventDefault();

    if(dropZone.classList.contains('dragged'))
       dropZone.classList.remove('dragged');
      const files=e.dataTransfer.files;
       if(files.length)
         {
             fileOpener.files=files; 
             upload();
         }
})

file_selector_btn.addEventListener('click',(e)=>{
  fileOpener.click();
})

fileOpener.addEventListener("change",()=>{
    upload();
})

const upload=()=>{
    const file=fileOpener.files[0];
    const formData=new FormData();

     formData.append("myFile",file);

     const xhr=new XMLHttpRequest();
     xhr.onreadystatechange=()=>{
          if(xhr.readyState===XMLHttpRequest.DONE)
            console.log(xhr.response);         
     }
     xhr.open('POST',uploadURL );
     xhr.send(formData)
}


