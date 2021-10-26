var validaMenu;
const activeMenu = () => {
    $("body").addClass("js_nav modalview");
};

const removeMenu = (event) => {
    $("body").removeClass("js_nav modalview");
};
jQuery(function($) {
    jQuery("img.lazy").each(function() {
        var currentImg = jQuery(this);

        jQuery(this).Lazy({
            onFinishedAll: function() {
                currentImg.parent("div.post_img_hover").removeClass("lazy");
                currentImg
                    .parent(".tg_gallery_lightbox")
                    .parent("div.gallery_grid_item")
                    .removeClass("lazy");
                currentImg.parent("div.gallery_grid_item").removeClass("lazy");
            },
        });
    });
});
jQuery(function($) {
    if (!location.pathname.includes("galeria.html")) {
        jQuery(document).bind("contextmenu", function(e) {
            jQuery("#right_click_content").addClass("visible");
            jQuery("body").addClass("right_clicked");
            e.preventDefault();

            jQuery(document).mousedown(function(event) {
                jQuery("#right_click_content").removeClass("visible");
                jQuery("body").removeClass("right_clicked");
            });
        });
    }
});

jQuery(function($) {
    jQuery("img").on("dragstart", function(event) {
        event.preventDefault();
    });
});

const menuMiniGlaeria = (img) => {

    $('.teste').css({
        "position": "absolute",
        "top": "500px",
        "left": "0",
        "content": "''",
        "height": "200px",
        "background": `url(${img})`,
        "background-size": "150%",
        "background-position": "bottom",
        "opacity": ".8",
        "width": "100%;",
        "filter": "blur(10px)",
        "z-index": "1"
    })
    $('.pagina-galeria .teste').animate({
        top: '0px'
    }, 500)
}

$(".pagina-galeria .icon").click(function() {


    if (!$('.pagina-galeria .carousel .icon').attr('class').includes('mostraGaleria')) {
        $(".pagina-galeria .icon").animate({
            top: '-18px'
        })
        $('.icon').removeClass('OcultarGaleria');
        $('.icon').addClass('mostraGaleria');
        setTimeout(() => {
            $('.icon').css('transform', 'rotate(180deg)');
        }, 900);

        var top;
        if (window.screen.width < 900) {
            top = "60vh"

        } else {
            top = "80vh"
        }
        $(".pagina-galeria .carousel-indicators").animate({
            top: top
        });

    } else {
        $('.pagina-galeria .icon').removeClass('mostraGaleria');
        $('.pagina-galeria .icon').addClass('OcultarGaleria');
        setTimeout(() => {
            $('.icon').css('transform', 'rotate(0deg)');
        }, 900);
        $(".pagina-galeria .icon").animate({
            top: '-38px'
        })

        $(".pagina-galeria .carousel-indicators").animate({
            top: '99.5vh'
        }, () => {

        });

    }
});

var validaMenu;
$('.icon-menu').click(function() {
    validaMenu = event.currentTarget.className;
    activeMenu();
})


$(".pagina-galeria .carousel-indicators li").click((event) => {

    menuMiniGlaeria(event.currentTarget.querySelector('img').src)
})

function retira_acentos(str) {

    com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ ";

    sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr ";
    novastr = "";
    for (i = 0; i < str.length; i++) {
        troca = false;
        for (a = 0; a < com_acento.length; a++) {
            if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                novastr += sem_acento.substr(a, 1);
                troca = true;
                break;
            }
        }
        if (troca == false) {
            novastr += str.substr(i, 1);
        }
    }
    return novastr;
}