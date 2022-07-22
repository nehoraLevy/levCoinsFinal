
function toolbar()
{
    let template=document.createElement("template");
    template.innerHTML=`
    <style>
        @import url('topToolBar.css');
    </style>
    <div class="topToolBar">
        <ul>
            <li class="list active">
                <a herf="#">
                    <span class="icon">
                        <ion-icon name="home-outline"></ion-icon>
                    </span>
                    <span class="text">Home</span>
                </a>
            </li>
            <li class="list">
                <a herf="#">
                    <span class="icon">
                        <ion-icon name="person-outline"></ion-icon>
                    </span>
                    <span class="text">login</span>
                </a>
            </li>
            <li class="list">
                <a herf="#">
                    <span class="icon">
                        <ion-icon name="help-circle-outline"></ion-icon>
                    </span>
                    <span class="text">Contact Us</span>
                </a>
            </li>
            <li class="list">
                <a herf="#">
                    <span class="icon">
                        <ion-icon name="storefront-outline"></ion-icon>
                    </span>
                    <span class="text">Stores</span>
                </a>
            </li>
            <div class="indicator"></div>
        </ul>
    </div>
    <script>
        const list= document.querySelectorAll('.list');
        function activeLink(){
            console.log("he");
            list.forEach((item)=> 
                item.classList.remove('active'));
                this.classList.add('active');
              }
            list.forEach((item)=>
            item.addEventListener('click',activeLink));
    </script>`;
    return template;
}