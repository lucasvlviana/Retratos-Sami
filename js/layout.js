 const pages = () => {};

 const layout = () => {
     var divPerspective = $("<div />", {
         id: "perspective",
     });
     //sss
     var divWrapper = $("<div />", {
         id: "wrapper",
         class: "hasbg transparent",
     });

     var divHeaderWrapper = $("<div />", {
         class: "header_style_wrapper",
     });

     var divTopHasbg = $("<div />", {
         class: "top_bar hasbg",
     });

     var divStandardWrapper = $("<div />", {
         id: "standard_wrapper",
     });

     var divLogoWrapper = $("<div />", {
         id: "logo_wrapper",
     });

     var divPageContent = $("<div/>", {
         id: "page_content_wrapper",
     });

     var divInner = $("<div/>", {
         class: "inner",
     });

     var divInnerWrapper = $("<div/>", {
         class: "inner_wrapper",
     });

     var divSidebarFull = $("<div/>", {
         class: "sidebar_content full_width",
     });

     var divElementor = $("<div/>", {
         class: "elementor elementor-1865",
     });

     var divElementorInner = $("<div/>", {
         class: "elementor-inner",
     });

     var divElementorSection = $("<div/>", {
         class: "elementor-section-wrap",
     });

     var sectionElementor = $("<section/>", {
         class: "elementor-element elementor-element-d84b78d elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section",
         "data-id": "d84b78d",
         "data-element_type": "section",
     });

     var divElementorContainer = $("<div/>", {
         class: "elementor-container elementor-column-gap-default",
     });

     var divElementorRow = $("<div/>", {
         class: "elementor-row",
     });

     var divElementorColumn = $("<div/>", {
         "data-id": "dbe20bb",
         class: "elementor-element elementor-element-dbe20bb elementor-column elementor-col-100 elementor-top-column",
         "data-element_type": "column",
     });

     var divElementorColumnWr = $("<div/>", {
         class: "elementor-column-wrap elementor-element-populated",
     });

     var divWidgtWrap = $("<div/>", {
         class: "elementor-widget-wrap",
     });

     var divWidgt = $("<div/>", {
         "data-id": "be52777",
         class: "elementor-element elementor-element-be52777 elementor-widget elementor-widget-photographer-slider-vertical-parallax",
         "data-element_type": "photographer-slider-vertical-parallax.default",
     });

     var divElementorCWidgetContainer = $("<div/>", {
         class: "elementor-widget-container",
     });

     var pages = $(".pagina");
     $(".pagina").remove();

     pages.each((index, page) => {
         divElementorCWidgetContainer.append(page);
     });

     divWidgt.append(divElementorCWidgetContainer);
     divWidgtWrap.append(divWidgt);
     divElementorColumnWr.append(divWidgtWrap);
     divElementorColumn.append(divElementorColumnWr);
     divElementorRow.append(divElementorColumn);
     divElementorContainer.append(divElementorRow);
     sectionElementor.append(divElementorContainer);
     divElementorSection.append(sectionElementor);
     divElementorInner.append(divElementorSection);
     divElementor.append(divElementorInner);
     divSidebarFull.append(divElementor);
     divInnerWrapper.append(divSidebarFull);
     divInner.append(divInnerWrapper);
     divPageContent.append(divInner);
     divWrapper.prepend(divPageContent);

     menuLateralAnimate();
     menuLateral();
     menuMobile();
     divStandardWrapper.append(divLogoWrapper);
     divTopHasbg.append(divStandardWrapper);
     divHeaderWrapper.append(divTopHasbg);
     divWrapper.append(divHeaderWrapper);
     divPerspective.append(divWrapper);
     $("body").prepend(divPerspective);
 };

 $("document").ready(() => {
     layout();
 });

 const menuLateralAnimate = async() => {
     var links = await fetch("json/menuLateralAnimate.json")
         .then((response) => response.json())
         .then((data) => {
             return data.links;
         });

     var divMobileMenuWrapper = $("<div />", {
         class: "mobile_menu_wrapper",
     });

     var divMobileMenuContent = $("<div />", {
         class: "mobile_menu_content",
     });

     var divMenuMainMenu = $("<div />", {
         class: "menu-main-menu-container",
     });

     var ulMobileMain = $("<ul />", {
         id: "mobile_main_menu",
         class: "mobile_main_nav",
     });

     links.forEach((element) => {
         var liMenuItem = $("<li />", {
             id: element.id,
             class: `megamenu col3 menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor menu-item-has-children ${element.id}`,
         });

         var link = $("<a />", {
             href: element.link,
         });
         link.text(element.nome);
         liMenuItem.append(link);
         ulMobileMain.append(liMenuItem);
     });

     divMenuMainMenu.append(ulMobileMain);
     divMobileMenuContent.append(divMenuMainMenu);
     divMobileMenuWrapper.append(divMobileMenuContent);
     $("body").prepend(divMobileMenuWrapper);
 };

 const logo = () => {
     var divLogoNormal = $("<div/>", {
         id: "logo_normal",
         class: "logo_container",
         style: "position:absolute",
     });

     var divLogoAlign = $("<div/>", {
         class: "logo_align",
     });

     var aCustom_logo = $("<a/>", {
         class: "logo_wrapper default",
         href: "/",
         id: "custom_logo_transparent",
     });

     var img = $("<img/>", {
         width: "150",
         src: "/img/logo.png",
         height: "111",
         style: "display:none",
     });
     aCustom_logo.append(img);
     divLogoAlign.append(aCustom_logo);
     divLogoNormal.append(divLogoAlign);
     return divLogoNormal;
 };

 const menuLateral = async() => {
     var links = await fetch("json/menuLateral.json")
         .then((response) => response.json())
         .then((data) => {
             return data.links;
         });

     var divMenuWrapper = $("<div/>", {
         id: "menu_wrapper",
         class: "hiddenMobile"
     });

     var divNavWrapper = $("<div/>", {
         id: "nav_wrapper",
     });

     var divWrapperInner = $("<div/>", {
         class: "nav_wrapper_inner ",
     });

     var divMenuBorder = $("<div/>", {
         id: "menu_border_wrapper",
     });

     var divMenuMainMenu = $("<div/>", {
         class: "menu-main-menu-container",
     });

     var ulMainMenu = $("<ul/>", {
         class: "nav",
         style: "float: right;height: 90vh;display: table !important;position:absolute;right:100px",
     });

     var liLogo = $("<li/>", {
         class: "liLogo",
     });

     var imgLogo = $("<img/>", {
         src: "./img/logos/Logo Nova Branca.jpeg",
         class: "imgLogo",
     });

     var liMenuItem = $("<li/>", {
         class: "col3 menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor menu-item-has-children ",
         style: "display: table-cell;vertical-align: middle !important;",
     });

     var aIconMenu = $("<a/>", {
         class: "icon-menu",
         onclick: "validaMenu = event.currentTarget.className; activeMenu();",
         style: "font-size: 2vh;font-weight: 100;padding-top: 2.5vh;padding-left:3px;background:rgba(0,0,0,.5)",
     });

     $(aIconMenu).text("Galeria");

     var span = $("<span/>", {});

     var ulMainMenu2 = $("<ul/>", {
         class: "nav",
         id: "main_menu",
         style: "position: absolute;top:50vh;left:4%;transform: translateY(-50%);",
     });

     liLogo.append(imgLogo);
     ulMainMenu2.append(liLogo);

     links.forEach((element) => {
         var liMenuItem2 = $("<li />", {
             id: element.id,
             class: `megamenu col3 menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor menu-item-has-children   ${element.id}`,
         });

         var link = $("<a />", {
             href: "#",
             style: "text-shadow: 1px 1px 1px #000; font-weight: 900;",
             onclick: `linksAnimation('${element.link}','${element.target}')`,
         });
         link.text(element.nome);
         liMenuItem2.append(link);
         ulMainMenu2.append(liMenuItem2);
     });

     aIconMenu.append(span);
     liMenuItem.append(aIconMenu);
     ulMainMenu.append(liMenuItem);
     divMenuMainMenu.append(ulMainMenu);
     divMenuMainMenu.append(ulMainMenu2);
     divMenuBorder.append(divMenuMainMenu);
     divWrapperInner.append(divMenuBorder);
     divNavWrapper.append(divWrapperInner);
     divMenuWrapper.append(divNavWrapper);
     $("#logo_wrapper").append(divMenuWrapper);
 };

 const menuMobile = async() => {
     var links = await fetch("json/menuLateral.json")
         .then((response) => response.json())
         .then((data) => {
             return data.links;
         });

     var nav = $("<nav/>", {
         class: "navbar navbar-expand-lg navbar-light bg-light hidden",
     });

     var linkInicial = $("<a/>", {
         class: "navbar-brand",
         href: "#",
     });

     linkInicial.text("RetratoSami");

     var btn = $("<button/>", {
         class: "navbar-toggler",
         type: "button",
         "data-toggle": "collapse",
         "data-target": "#navbarNavDropdown",
         "aria-controls": "navbarNavDropdown",
         "aria-label": "Toggle navigation",
     });

     var span = $("<span/>", {
         class: "navbar-toggler-icon",
     });

     var divMenu = $("<div/>", {
         id: "navbarNavDropdown",
         class: "collapse navbar-collapse",
     });

     var ulMenu = $("<ul/>", {
         class: "navbar-nav mr-auto mt-2 mt-lg-0",
     });

     links.forEach((element, index) => {
         // if (element.nome !== "GALERIA") {

         var liMenu = $("<li />", {
             class: index === 0 ? "nav-item active" : "nav-item",
         });

         var link;
         if (element.target === "portifolio") {
             link = $("<a/>", {
                 href: element.link,
                 class: "nav-link",
             });
         } else if (element.target === "_blanck") {
             link = $("<a/>", {
                 href: element.link,
                 class: "nav-link",
                 target: element.target
             });
         } else {
             link = $("<a/>", {
                 href: element.link,
                 class: "nav-link",
             });
         }
         var spanLink = $("<span/>", {
             class: "sr-only",
         });

         link.text(element.nome);
         if (index === 0) {
             spanLink.text("(current)");
             link.append(spanLink);
         }
         liMenu.append(link);
         ulMenu.append(liMenu);
         // }
     });

     nav.append(linkInicial);
     nav.append(btn);
     nav.append(divMenu);
     btn.append(span);
     divMenu.append(ulMenu);
     $("header").append(nav);
 };

 var slideDurationSetting = 800;
 var currentSlideNumber = 0;
 var atual = 0;
 const linksAnimation = (link, target) => {
     if (target === "portifolio")
         $("body").animate({
                 opacity: "0",
             },
             () => {
                 window.location.href = link;
             }
         );
     else if (target === "") {
         // if (element.includes("comentario")) {
         var totalSlide = jQuery(".tg_parallax_slide_background");
         var paginaDestino = 0;

         totalSlide.each((index, element) => {
             if (
                 element
                 .getAttribute("class")
                 .includes(link.substring(link.indexOf("#") + 1))
             ) {
                 paginaDestino = index;
             }
         });

         if (paginaDestino == 0) {
             window.location.href = "./";
             return;
         }

         for (var cont = 0; paginaDestino > currentSlideNumber; cont++) {
             console.log(paginaDestino);
             currentSlideNumber++;
             nextItem();
             slideDurationTimeout(slideDurationSetting);
         }
         currentSlideNumber = 0;
         atual = paginaDestino;
         paginaDestino = 0;
     } else window.open(link);
 };

 function nextItem() {
     var $previousSlide = jQuery(".tg_parallax_slide_background").eq(
         currentSlideNumber - 1
     );
     $previousSlide
         .css("transform", "translate3d(0,-130vh,0)")
         .find(".tg_parallax_slide_content_wrapper")
         .css("transform", "translateY(40vh)");
     currentSlideTransition();
 }

 function previousItem() {
     var $previousSlide = jQuery(".tg_parallax_slide_background").eq(
         currentSlideNumber + 1
     );
     $previousSlide
         .css("transform", "translate3d(0,30vh,0)")
         .find(".tg_parallax_slide_content_wrapper")
         .css("transform", "translateY(30vh)");
     currentSlideTransition();
 }

 function currentSlideTransition() {
     var $currentSlide = jQuery(".tg_parallax_slide_background").eq(
         currentSlideNumber
     );
     $currentSlide
         .css("transform", "translate3d(0,-15vh,0)")
         .find(".tg_parallax_slide_content_wrapper")
         .css("transform", "translateY(15vh)");
 }

 function slideDurationTimeout(slideDuration) {
     setTimeout(function() {
         ticking = false;
     }, slideDuration);
 }