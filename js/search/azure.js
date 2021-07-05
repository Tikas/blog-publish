var AzureSearch,SearchService="";!function(a){SearchService=function(o){var t=this;t.config=a.extend({per_page:10,selectors:{body:"body",form:".u-search-form",input:".u-search-input",container:"#u-search",modal:"#u-search .modal",modal_body:"#u-search .modal-body",modal_footer:"#u-search .modal-footer",modal_overlay:"#u-search .modal-overlay",modal_results:"#u-search .modal-results",modal_metadata:"#u-search .modal-metadata",modal_error:"#u-search .modal-error",modal_loading_bar:"#u-search .modal-loading-bar",modal_ajax_content:"#u-search .modal-ajax-content",modal_logo:"#u-search .modal-footer .logo",btn_close:"#u-search .btn-close",btn_next:"#u-search .btn-next",btn_prev:"#u-search .btn-prev"},brands:{hexo:{logo:"",url:""},google:{logo:"google.svg",url:"https://cse.google.com"},algolia:{logo:"algolia.svg",url:"https://www.algolia.com"},baidu:{logo:"baidu.svg",url:"http://zn.baidu.com/cse/home/index"},azure:{logo:"azure.svg",url:"https://azure.microsoft.com/en-us/services/search/"}},imagePath:"https://cdn.jsdelivr.net/gh/volantis-x/cdn-volantis@master/img/logo/"},o),t.dom={},t.percentLoaded=0,t.open=!1,t.queryText="",t.nav={next:-1,prev:-1,total:0,current:1},t.parseSelectors=function(){for(var e in t.config.selectors)t.dom[e]=a(t.config.selectors[e])},t.beforeQuery=function(){t.open||t.dom.container.fadeIn(),t.dom.input.each((function(e,o){a(o).val(t.queryText)})),document.activeElement.blur(),t.dom.modal_error.hide(),t.dom.modal_ajax_content.removeClass("loaded"),t.startLoading()},t.afterQuery=function(){t.dom.modal_body.scrollTop(0),t.dom.modal_ajax_content.addClass("loaded"),t.stopLoading()},t.search=function(a,e){t.beforeQuery(),t.search instanceof Function?t.query(t.queryText,a,(function(){t.afterQuery()})):(console.log("query() does not exist."),t.onQueryError(t.queryText,""),t.afterQuery())},t.onQueryError=function(a,e){var o;o="success"===e?'No result found for "'+a+'".':"timeout"===e?"Unfortunate timeout.":"Mysterious failure.",t.dom.modal_results.html(""),t.dom.modal_error.html(o),t.dom.modal_error.show()},t.nextPage=function(){-1!==t.nav.next&&t.search(t.nav.next)},t.prevPage=function(){-1!==t.nav.prev&&t.search(t.nav.prev)},t.getUrlRelativePath=function(a){var e=a.split("//"),o=e[1].indexOf("/"),t=e[1].substring(o);return-1!=t.indexOf("?")&&(t=t.split("?")[0]),t},t.buildResult=function(a,e,o){var n="";return n="<li>",n+="<a class='result' href='"+t.getUrlRelativePath(a)+"'>",n+="<span class='title'>"+e+"</span>",""!==o&&(n+="<span class='digest'>"+o+"</span>"),(n+="</a>")+"</li>"},t.close=function(){t.open=!1,t.dom.container.fadeOut(),t.dom.body.removeClass("modal-active")},t.onSubmit=function(e){e.preventDefault(),t.queryText=a(this).find(".u-search-input").val(),t.queryText&&t.search(1)},t.startLoading=function(){t.dom.modal_loading_bar.show(),t.loadingTimer=setInterval((function(){t.percentLoaded=Math.min(t.percentLoaded+5,95),t.dom.modal_loading_bar.css("width",t.percentLoaded+"%")}),100)},t.stopLoading=function(){clearInterval(t.loadingTimer),t.dom.modal_loading_bar.css("width","100%"),t.dom.modal_loading_bar.fadeOut(),setTimeout((function(){t.percentLoaded=0,t.dom.modal_loading_bar.css("width","0%")}),300)},t.addLogo=function(a){var e="";t.config.brands[a]&&t.config.brands[a].logo&&(e+="<a href='"+t.config.brands[a].url+"' class='"+a+"'>",e+='<img src="'+t.config.imagePath+t.config.brands[a].logo+'" />',e+="</a>",t.dom.modal_logo.html(e))},t.destroy=function(){t.dom.form.each((function(e,o){a(o).off("submit")})),t.dom.modal_overlay.off("click"),t.dom.btn_close.off("click"),t.dom.btn_next.off("click"),t.dom.btn_prev.off("click"),t.dom.container.remove()},t.init=function(){a("body").append(e),t.parseSelectors(),t.dom.modal_footer.show(),t.dom.form.each((function(e,o){a(o).on("submit",t.onSubmit)})),t.dom.modal_overlay.on("click",t.close),t.dom.btn_close.on("click",t.close),t.dom.btn_next.on("click",t.nextPage),t.dom.btn_prev.on("click",t.prevPage)},t.init()};var e='<div id="u-search"><div class="modal"> <header class="modal-header" class="clearfix"><form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm"> <input type="text" id="u-search-modal-input" class="u-search-input" /> <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit"> <span class="fas fa-search"></span> </button></form> <a class="btn-close"> <span class="fas fa-times"></span> </a><div class="modal-loading"><div class="modal-loading-bar"></div></div> </header> <main class="modal-body"><ul class="modal-results modal-ajax-content"></ul> </main> <footer class="modal-footer clearfix"><div class="modal-metadata modal-ajax-content"> <strong class="range"></strong> of <strong class="total"></strong></div><div class="modal-error"></div> <div class="logo"></div> <a class="nav btn-next modal-ajax-content"> <span class="text">NEXT</span> <span class="fal fa-chevron-right"></span> </a> <a class="nav btn-prev modal-ajax-content"> <span class="fal fa-chevron-left"></span> <span class="text">PREV</span> </a> </footer></div><div class="modal-overlay"></div></div>'}(jQuery),function(a){"use strict";AzureSearch=function(e){SearchService.apply(this,arguments);var o=this,t="https://"+o.config.serviceName+".search.windows.net/indexes/"+o.config.indexName+"/docs?api-version=2015-02-28";return o.nav.current=1,o.addLogo("azure"),o.buildResultList=function(e){var t="";return a.each(e,(function(a,e){var n=e.permalink||e.path||"";!e.permalink&&e.path&&(n="/"+n);var r=e.title,s=e.excerpt||"";t+=o.buildResult(n,r,s)})),t+="<script>try{pjax.refresh(document.querySelector('#u-search'));document.addEventListener('pjax:send',function(){$('#u-search').fadeOut(500);$('body').removeClass('modal-active')});}catch(e){$('#u-search').fadeOut(500);}<\/script>"},o.buildMetadata=function(a,e){o.nav.current=e,o.nav.currentCount=a.value.length,o.nav.total=parseInt(a["@odata.count"]),o.dom.modal_metadata.children(".total").html(o.nav.total),o.dom.modal_metadata.children(".range").html(o.nav.current+"-"+(o.nav.current+o.nav.currentCount-1)),o.nav.total>0?o.dom.modal_metadata.show():o.dom.modal_metadata.hide(),o.nav.current+o.nav.currentCount<=o.nav.total?(o.nav.next=o.nav.current+o.nav.currentCount,o.dom.btn_next.show()):(o.nav.next=-1,o.dom.btn_next.hide()),o.nav.current>1?(o.nav.prev=o.nav.current-o.config.per_page,o.dom.btn_prev.show()):(o.nav.prev=-1,o.dom.btn_prev.hide())},o.query=function(e,n,r){a.ajax({url:t,headers:{Accept:"application/json","api-key":o.config.queryKey},data:{search:e,$orderby:"date desc",$skip:n-1,$top:o.config.per_page,$count:!0},type:"GET",success:function(a,t){if("success"===t&&a.value&&a.value.length>0){var s=o.buildResultList(a.value);o.dom.modal_results.html(s)}else o.onQueryError(e,t);o.buildMetadata(a,n),r&&r(a)}})},o}}(jQuery);