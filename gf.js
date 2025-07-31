function gf(eventObjectLocal) {
    const OPELLA_REGEX = new RegExp(
        "opella|allegra|novalgina|enterogermina|dorflex|dulcolax|oscal|os-cal|targifor|moura brasil|bisolvon|anador|guttalax|cremefenergan|mucusolvan|allenasal|fenergan|cewin|depura",
        "i"
    );

    //Impede o disparo de qualquer evento em PDPs de produtos que não sejam da Opella
    const URL = document.URL;
    const PDP_REGEX = new RegExp("/p$");

    if (URL.match(PDP_REGEX) && !URL.match(OPELLA_REGEX)) {
        return;
    }


    //Filtra apenas os produtos de Opella
    if (eventObjectLocal?.items) {
        eventObjectLocal.items = eventObjectLocal.items.filter((item) => item.product_brand.match(OPELLA_REGEX));

        //Não envio o evento caso não haja nenhum produto Opella no array de itens
        if (!eventObjectLocal?.items?.length > 0) {
            return
        }
    }

    //Filtra eventos de banners que venham de banners de produtos concorrentes
    if (eventObjectLocal.type == "view_banner" || eventObjectLocal.type == "click_banner") {
        const bannerData = eventObjectLocal?.items?.[0]?.banners?.[0];

        if (!bannerData || !bannerData.creative_name.match(OPELLA_REGEX)) {
            return;
        }
    }

    pm(eventObjectLocal);
}
