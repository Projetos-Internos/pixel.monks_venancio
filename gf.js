function gf(eventObjectLocal) {
    
    //Filtra apenas os produtos de Opella
    if(eventObjectLocal?.items) {
        eventObjectLocal.items = eventObjectLocal.items.filter((item) => item.product_brand == "OPELLA");
    }

    //Envia o evento somente se o mesmo for um Page View ou contiver ao menos um produto opella
    if(
        eventObjectLocal.type == "page_view"
        || eventObjectLocal.type == "view_banner"
        || eventObjectLocal.type == "click_banner"
        || eventObjectLocal?.items?.length > 0
    ) {
        pm(eventObjectLocal);
    }
}
