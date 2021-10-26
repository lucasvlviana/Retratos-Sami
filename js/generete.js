const retornarDados = (urlData) => {
    $.ajax({
        type: "POST",
        url: "./galeria.php",
        /* endereço do phpmailer */
        async: true,
        data: urlData,
        /* informa Url */
        success: function(arr) {
            /* sucesso */
            $(".scripts").append(arr);

            if (location.pathname.includes('galeria')) {
                fotoGaleria("galeria");
            } else fotoGaleria("inicial");

        },
        beforeSend: function() {
            /* antes de enviar */
            $(".loading").fadeIn("fast");
        },
        complete: function() {
            /* completo */
            $("#exampleModal").modal("show");
            $(".loading").fadeOut("fast");
        },
    });
};

const fotoGaleria = async(tipo) => {
    var page = tipo === "galeria" ? ".pagina-galeriaFull" : ".pagina-galeria";

    if (tipo === "galeria") {
        $(`.pagina-galeriaFull ol.carousel-indicators`).text("");
        $(`.pagina-galeriaFull .carousel-inner`).text("");
    }

    state.forEach((element, index) => {
        var active = index == 0 ? "active" : "";

        var thumbCarosel = $("<li/>", {
            "data-target": "#carouselExampleIndicators",
            "data-slide-to": index,
            class: active,
        });

        var thumbImg = $("<img/>", {
            src: element.img,
            class: "d-block w-100",
            alt: "''",
        });

        var divCarouselItem = $("<div/>", {
            class: index == 0 ? `carousel-item ${active}` : "carousel-item",
        });

        var Img = $("<img/>", {
            src: element.img,
            class: "img-fluid",
            alt: "''",
        });

        thumbCarosel.append(thumbImg);

        $(`${page} ol.carousel-indicators`).append(thumbCarosel);

        divCarouselItem.append(Img);
        $(`${page} .carousel-inner`).append(divCarouselItem);

        if (tipo === "galeria")
            $("#exampleModalLabel").text(element.tipo);
        else if (tipo === "inicial") {
            $(`.pagina-galeria ol.carousel-indicators .teste`).remove("");
            $(`.pagina-galeria ol.carousel-indicators .icon`).remove("");
            $(`${page} ol.carousel-indicators`).append($('<div/>', { class: "teste" }));
            $(`${page} ol.carousel-indicators`).append($('<div/>', { class: "icon" }));
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
        }
    });
};

const galeriaFull = async() => {
    state = await fetch("json/menuLateralAnimate.json")
        .then((response) => response.json())
        .then((data) => {
            return data.links;
        });

    state.forEach((element) => {
        var galeriaItem = $("<div/>", {
            class: "galeria-item",
            onclick: `retornarDados('&tipo=${retira_acentos(element.nome)}')`,
            // "data-toggle": "modal",
            // "data-target": "#exampleModal"
        });

        var imgItem = $("<img/>", {
            src: element.capa,
        });

        var title = $("<div/>", {
            class: "title",
        });

        var span = $("<span/>");

        span.text(element.nome);

        title.append(span);
        galeriaItem.append(title);
        galeriaItem.append(imgItem);

        $(".pagina-galeria-Body").append(galeriaItem);
    });
};

const generatePortilolio = async() => {
    state = await fetch("json/portifolio.json")
        .then((response) => response.json())
        .then((data) => {
            return data.portifolio;
        });

    state.forEach((element, index) => {
        var active = element.order == "1";

        var caroselItem = document.createElement("div");
        caroselItem.setAttribute(
            "class",
            active ?
            `carousel-item active order${element.order}` :
            `carousel-item  order${element.order}`
        );
        var legends = document.createElement("div");
        legends.setAttribute(
            "class",
            index % 2 == 0 ? "legends" : "legends legends-right"
        );

        var msg = document.createElement("div");
        msg.setAttribute("class", "msg");

        var titulo = document.createElement("h2");
        titulo.innerText = element.titulo;

        var spanDiv = document.createElement("div");
        spanDiv.setAttribute("class", "span");

        var span = document.createElement("span");
        span.innerText = element.conteudo;

        var img = document.createElement("img");
        img.setAttribute("class", `d-block w-100 img`);
        img.setAttribute("src", `${element.img}`);
        img.setAttribute("alt", element.titulo);

        caroselItem.append(img);
        caroselItem.append(legends);
        legends.append(msg);
        msg.append(titulo);
        msg.append(spanDiv);
        spanDiv.append(span);
        $(".carousel-inner").append(caroselItem);
        $(".imgVoltar").click(() => {
            $("body").animate({
                    opacity: "0",
                },
                1500,
                () => {
                    window.location.href = "./";
                }
            );
        });
        generateThumb(element, index, active);
    });
};

const generateQuemEuSou = async() => {
    $(".imgVoltar").click(() => {
        window.location.href = "/";
    });
};

const generateThumb = (element, index, active) => {
    var li = document.createElement("li");
    li.setAttribute(
        "class",
        element.order == "1" ?
        `active order${element.order}` :
        `order${element.order}`
    );
    li.setAttribute("data-target", "#carouselExampleIndicators");
    li.setAttribute("data-slide-to", index);
    li.setAttribute("valor", element.titulo);

    var img = document.createElement("img");
    img.setAttribute("class", "d-block img-x");
    img.setAttribute("src", `${element.img}`);
    img.setAttribute("alt", element.titulo);

    li.append(img);
    $(".carousel-indicators").append(li);
};

const indiceComentario = (index, active) => {
    var li = $("<li/>", {
        "data-target": "#carouselExampleIndicatorsComentario",
        "data-slide-to": index,
        class: active,
    });

    $(".pagina-comentario .carousel-indicators").append(li);
};

const comentario = async() => {
    state = await fetch("json/comentario.json").then((response) =>
        response.json().then((dados) => {
            return dados.comentario;
        })
    );

    state.forEach((element, index) => {
        var divCarosel = $("<div/>", {
            class: `carousel-item ${index == 0 ? "active" : " "}`,
        });

        var divPerfil = $("<div/>", {
            class: "imgPerfil mx-auto",
        });

        var imgPerfil = $("<img/>", {
            src: element.img,
            class: "rounded rounded-circle",
            alt: `comentario ${element.nome}`,
        });

        var hTitle = $("<h2/>", {
            class: "title",
        });

        $(hTitle).text(element.nome);

        var divDescription = $("<div/>", {
            class: "description",
        });

        var leiaMais = $("<div/>", {
            class: "leiaMais",
            "data-target": "#modalComentario",
            "data-toggle": "modal",
        });

        if (index == 0) $(".pagina-comentario .modal-body").text(element.msg);

        $(divDescription).text(`${element.msg.substr(0, 110)} ...`);

        leiaMais.text("Leia Mais");
        $(divDescription).append(leiaMais);

        indiceComentario(index, index == 0 ? "active" : " ");

        divCarosel.append(divPerfil);
        divCarosel.append(hTitle);
        divCarosel.append(divDescription);
        divPerfil.append(imgPerfil);
        $(".pagina-comentario .carousel-inner").append(divCarosel);

        $(".pagina-comentario li").click((e) => {
            state.forEach((element, index) => {
                if (index == e.target.getAttribute("data-slide-to"))
                    $(".pagina-comentario .modal-body").text(element.msg);
            });
        });
    });
};

const miniGaleria = async() => {
    var state = await fetch("/json/miniGaleria.json").then((response) =>
        response.json().then((dados) => {
            return dados.miniGaleria;
        })
    );

    state.forEach((element, index) => {});
};