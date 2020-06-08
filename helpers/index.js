let renderCustom = (res, data, view) => {
    // lay thong tin infoUser
     /**
     * infoUser -> DB
     */
    let infoUser = {
        username: 'abc'
    };
    data.infoUser = infoUser;
    res.render(view, data);
}

exports.renderCustom = renderCustom;