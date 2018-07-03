Object.prototype.zkPaging=function(obj,setPageNum,setPages) {
    // 获取存放paging分页元素
    var pagingElement = this
    if (obj == 'setPage') {
       pagingElement.pageObj.pageNum = setPageNum;
       pagingElement.pageObj.pages = setPages;
   } else {
       pagingElement.pageObj = obj
   }
   // 总页数
   var pages = pagingElement.pageObj.pages ? pagingElement.pageObj.pages : 0;
   // 第几页
   var pageNum = pagingElement.pageObj.pageNum ? pagingElement.pageObj.pageNum : 1;
   // 展示页码数量
   pagingElement.pageObj.pageShowNum = pagingElement.pageObj.pageShowNum ? pagingElement.pageObj.pageShowNum : 5;
   // 是否显示上一页下一页按钮
   pagingElement.pageObj.pageOneShow = pagingElement.pageObj.pageOneShow == false?pagingElement.pageObj.pageOneShow:true;
   // 上一页按钮文本设置
   pagingElement.pageObj.prevOneText = pagingElement.pageObj.prevOneText?pagingElement.pageObj.prevOneText:'<';
   // 下一页按钮文本设置
   pagingElement.pageObj.nextOneText = pagingElement.pageObj.nextOneText?pagingElement.pageObj.nextOneText:'>';
   // 是否显示上多页下多页页按钮
   pagingElement.pageObj.pageMuchShow = pagingElement.pageObj.pageMuchShow == false?pagingElement.pageObj.pageMuchShow:true;
   // 设置多页数量
   pagingElement.pageObj.pageMuchNum = pagingElement.pageObj.pageMuchNum?pagingElement.pageObj.pageMuchNum:10;
   // 上多页按钮文本设置
   pagingElement.pageObj.prevMuchText = pagingElement.pageObj.prevMuchText?pagingElement.pageObj.prevMuchText:'<<';
   // 下多页按钮文本设置
   pagingElement.pageObj.nextMuchText = pagingElement.pageObj.nextMuchText?pagingElement.pageObj.nextMuchText:'>>';
   // 是否显示首页尾页按钮
   pagingElement.pageObj.pageHEShow = pagingElement.pageObj.pageHEShow == false?pagingElement.pageObj.pageHEShow:true;
   // 首页文本设置
   pagingElement.pageObj.homePageText = pagingElement.pageObj.homePageText?pagingElement.pageObj.homePageText:'首页';
   // 尾页文本设置
   pagingElement.pageObj.endPageText = pagingElement.pageObj.endPageText?pagingElement.pageObj.endPageText:'尾页';
   // 是否显示每页显示条数按钮
   pagingElement.pageObj.pageSizeShow = pagingElement.pageObj.pageSizeShow == false?pagingElement.pageObj.pageSizeShow:true
   // 选择每页显示的条数
   var pageSizeObjInit  = [
       {'value': 100, 'text': '100条/页', 'selected': true},
       {'value': 200, 'text': '200条/页'},
       {'value': 300, 'text': '300条/页'},
       {'value': 400, 'text': '400条/页'}
   ];
   pagingElement.pageObj.pageSizeObj = pagingElement.pageObj.pageSizeObj?pagingElement.pageObj.pageSizeObj:pageSizeObjInit;
   pagingElement.pageObj.pageSize = 100;
   // 是否显示共几页
   pagingElement.pageObj.pagesNumShow = pagingElement.pageObj.pagesNumShow == false?pagingElement.pageObj.pagesNumShow:true;
   // 展示页码数量
   var pageShowNum = pagingElement.pageObj.pageShowNum;
   var pageShowLeft = 0;
   var pageShowRighr = pagingElement.pageObj.pageShowNum;
   zkPageInit()
   // 添加html标签
   function zkPageInit () {
       var zkPages = document.createElement("div");
       zkPages.className = 'zkPages'
       pagingElement.appendChild(zkPages)
       if(pagingElement.pageObj.pageHEShow) {
           var homePage = document.createElement("div");
           homePage.className = 'homePage';
           homePage.innerText = pagingElement.pageObj.homePageText;
           var endPage = document.createElement("div");
           endPage.className = 'endPage';
           endPage.innerText = pagingElement.pageObj.endPageText;
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(homePage)
       }
       if (pagingElement.pageObj.pageMuchShow) {
           var prevMuch = document.createElement("div");
           prevMuch.className = 'prevMuch';
           prevMuch.innerText = pagingElement.pageObj.prevMuchText;
           var nextMuch = document.createElement("div");
           nextMuch.className = 'nextMuch';
           nextMuch.innerText = pagingElement.pageObj.nextMuchText;        
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(prevMuch)
       }
       if (pagingElement.pageObj.pageOneShow) {
           var prevOne=document.createElement("div");
           prevOne.className = 'prevOne';
           prevOne.innerText = pagingElement.pageObj.prevOneText;
           var nextOne=document.createElement("div");
           nextOne.className = 'nextOne';
           nextOne.innerText = pagingElement.pageObj.nextOneText
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(prevOne)
       }
       var page = document.createElement("div");
       page.className = 'page';
       pagingElement.querySelectorAll('.zkPages')[0].appendChild(page)
       if (pagingElement.pageObj.pageOneShow) {
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(nextOne)
       }
       if (pagingElement.pageObj.pageMuchShow) {
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(nextMuch)
       }
       if(pagingElement.pageObj.pageHEShow) {
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(endPage)
       }
       if (pagingElement.pageObj.pagesNumShow) {
            var pagesNumText = document.createElement("div");
            pagesNumText.className = 'pagesNumText';
            pagesNumText.innerText = '共'+pages+'页';
            pagingElement.querySelectorAll('.zkPages')[0].appendChild(pagesNumText)
       }
       if (pagingElement.pageObj.pageSizeShow) {
           var pageSizeSelectBox = document.createElement("div");
           pageSizeSelectBox.className = 'pageSizeSelectBox';
           var pageSizeVal = document.createElement("div");
           pageSizeVal.className = 'pageSizeVal';
           pageSizeSelectBox.appendChild(pageSizeVal);
           var pageSizeUl = document.createElement("UL");
           pageSizeUl.className = 'pageSizeUl';
           pageSizeUl.style.display = 'none';
           pageSizeSelectBox.appendChild(pageSizeUl);
           for (var i = 0; i < pagingElement.pageObj.pageSizeObj.length;i++) {
               var pageSizeLi = document.createElement("LI");
               pageSizeLi.className = 'pageSizeLi';
               pageSizeLi.innerText = pagingElement.pageObj.pageSizeObj[i].value
               pageSizeUl.appendChild(pageSizeLi);
               if(pagingElement.pageObj.pageSizeObj[i].selected) {
                   pageSizeVal.innerText = pagingElement.pageObj.pageSizeObj[i].value
                   pagingElement.pageObj.pageSize = pagingElement.pageObj.pageSizeObj[i].value;
               }
           }
           pagingElement.querySelectorAll('.zkPages')[0].appendChild(pageSizeSelectBox)
       }
   }
   function pageListS () {
       if (pageNum > Math.floor(pageShowNum / 2) ) {
           if (pages > Math.floor(pageShowNum / 2) + pageNum) {
               pageShowLeft = (Math.floor(pageShowNum / 2) + pageNum)-pageShowNum
               pageShowRighr = Math.floor(pageShowNum / 2) + pageNum
           } else {
               pageShowRighr = pages;
               pageShowLeft = pages-pageShowNum
           }
       }
       if (pageNum <= Math.floor(pageShowNum / 2)) {
           pageShowLeft = 0
           pageShowRighr = pageShowNum
       }
   }
   // 渲染分页list
   function pageList () {
       pagingElement.querySelectorAll('.page')[0].innerHTML = ''
       for (var i = 1; i <= pages; i++) {
           if (i <= pageShowRighr && i > pageShowLeft) {
               var node=document.createElement("div");
               node.className = 'pageList'
               node.innerText = i;
               if (i == pageNum) {
                   node.className = 'pageList pageSelected'
                   pagingElement.querySelectorAll('.page')[0].appendChild(node)
               } else {
                   pagingElement.querySelectorAll('.page')[0].appendChild(node) 
               }
           }
       };
       pagingElement.pageObj.callback(pageNum,pagingElement.pageObj.pageSize)
   }
   pageListS()
   pageList()
   // 点击事件
   pagingElement.onclick = function (event) {
       var e = event || window.event;
       switch (e.target.className) {
           case 'prevOne':
               if (pageNum <= 1) {
                   pageNum = 1;
               } else {
                   pageNum = parseFloat(pageNum - 1);
               };
               // 当前的页数 <= 现在显示到的页数 - 显示页数
               if (pageNum <= parseFloat(pageShowRighr - pageShowNum) && parseFloat(pageShowRighr - pageShowNum) >= pageShowNum) {
                   pageShowLeft = pageShowLeft - pageShowNum;
                   pageShowRighr= pageShowRighr-pageShowNum;
               }else if (pageNum <= parseFloat(pageShowRighr - pageShowNum)  && parseFloat(pageShowRighr - pageShowNum) < pageShowNum) {
                   pageShowLeft = pageShowLeft - pageShowNum;
                   pageShowRighr= pageShowNum;
               }
               pageList()
               break;
           case 'nextOne':
               // 当前的页数 >= 现在页数  && 总页数 >=  现在页数 + 显示页数
               if (pageNum >= pageShowRighr && pages >= parseFloat(pageShowRighr + pageShowNum)) {
                   pageShowLeft = pageShowLeft + pageShowNum;
                   pageShowRighr= pageShowRighr+pageShowNum;
               } else if (pageNum >= pageShowRighr && pages - parseFloat(pageShowRighr + pageShowNum) < pageShowNum) {
                   pageShowLeft = pageShowLeft + parseFloat(pages - pageShowRighr);
                   pageShowRighr= pageShowRighr+parseFloat(pages - pageShowRighr);
               }
               if (pageNum >= pages) {
                   pageNum = pages;
               } else {
                   pageNum = parseFloat(pageNum + 1);
               };
               pageList()
               break;
           case 'prevMuch':
               if (pageNum <= 1 || pageNum - pagingElement.pageObj.pageMuchNum <= 1) {
                   pageNum = 1;
               } else {
                   pageNum = parseFloat(pageNum - pagingElement.pageObj.pageMuchNum);
               };
               // 当前的页数 <= 现在显示到的页数 - 显示页数
               if (pageNum <= parseFloat(pageShowRighr - pageShowNum)) {
                   pageShowLeft = pageShowLeft - pageShowNum;
                   pageShowRighr= pageShowRighr-pageShowNum;
               }
               pageListS()
               pageList()
               break;
           case 'nextMuch':
               // 当前的页数 >= 现在页数  && 总页数 >=  现在页数 + 显示页数
               if (pageNum >= pageShowRighr && pages >= parseFloat(pageShowRighr + pageShowNum)) {
                   pageShowLeft = pageShowLeft + pageShowNum;
                   pageShowRighr= pageShowRighr+pageShowNum;
               }
               if (pageNum >= pageShowRighr || pageNum + pagingElement.pageObj.pageMuchNum >= pages) {
                   pageNum = pageShowRighr;
               } else {
                   pageNum = parseFloat(pageNum + pagingElement.pageObj.pageMuchNum);
               };
               pageListS()
               pageList()
               break;
           case 'pageList':
               pageNum = parseFloat(e.target.innerText);
               pageListS();
               pageList()
               break;
           case 'homePage':
               pageNum = 1;
               pageListS();
               pageList()
               break;
           case 'endPage':
               pageNum = pages;
               pageListS();
               pageList()
               break;
           case 'pageSizeSelectBox':
               pageSizeClick();
               break;
           case 'pageSizeVal':
               pageSizeClick();
               break;
           case 'pageSizeLi':
               var value = e.target.innerText;
               document.querySelectorAll('.pageSizeVal')[0].innerText = value;
               pagingElement.pageObj.pageSize = value;
               pageSizeClick();
               pageList();
               break;
       }
   };
   function pageSizeClick () {
       if (document.querySelectorAll('.pageSizeUl')[0].style.display == 'none') {
           document.querySelectorAll('.pageSizeUl')[0].style.display = 'block'
       } else {
           document.querySelectorAll('.pageSizeUl')[0].style.display = 'none'
       }
   };
}