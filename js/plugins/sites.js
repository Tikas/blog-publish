const SitesJS={requestAPI:(e,t,r)=>{let n=5;!function s(){return new Promise(((a,o)=>{let c=0,i=setTimeout((()=>{0===c&&(c=2,i=null,o("请求超时"),0==n&&r())}),5e3);fetch(e).then((function(e){if(2!==c&&(clearTimeout(i),a(e),i=null,c=1),e.ok)return e.json();throw new Error("Network response was not ok.")})).then((function(e){n=0,t(e)})).catch((function(e){n>0?(n-=1,setTimeout((()=>{s()}),5e3)):r()}))}))}()},layout:e=>{const t=e.el;SitesJS.requestAPI(e.api,(function(r){t.querySelector(".loading-wrap").remove();const n=r.content;var s="";n.forEach(((t,r)=>{var n='<div class="site-card">';n+='<a class="card-link" target="_blank" rel="external nofollow noopener noreferrer" href="'+t.url+'">',n+='<img src="'+(t.screenshot||"https://image.thum.io/get/width/1024/crop/768/"+t.url)+'" onerror="javascript:this.src=\''+e.screenshot+"';\"/>",n+='<div class="info">',n+='<img src="'+(t.avatar||e.avatar)+'" onerror="javascript:this.src=\''+e.avatar+"';\"/>",n+='<span class="title">'+t.title+"</span>",n+='<span class="desc">'+(t.description||t.url)+"</span>",n+="</div>",n+="</a>",s+=n+="</div>"})),t.querySelector(".group-body").innerHTML=s}),(function(){try{t.querySelector(".loading-wrap svg").remove(),t.querySelector(".loading-wrap p").innerText("加载失败，请稍后重试。")}catch(e){}}))},start:e=>{const t=document.getElementsByClassName("sitesjs-wrap");for(var r=0;r<t.length;r++){const n=t[r],s=n.getAttribute("api");if(null!=s)(e=new Object).class=n.getAttribute("class"),e.el=n,e.api=s,e.avatar="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/link/8f277b4ee0ecd.svg",e.screenshot="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/cover/76b86c0226ffd.svg",SitesJS.layout(e)}}};SitesJS.start(),document.addEventListener("pjax:complete",(function(){SitesJS.start()}));