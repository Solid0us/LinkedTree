module.exports = (sequelize, Sequelize) => {
    const Link = sequelize.define("link", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        link: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        post_date: {
            type: Sequelize.DATE
        },
        hidden: {
            type: Sequelize.TINYINT
        }
    },
    {timestamps: false,
    freezeTableName: true}
    
    );
    return Link;
}