'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('<%= tableName %>', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        <% _.each(attributes, function (dataType, fieldName) { %>
          <%= fieldName %>: {
            type: Sequelize.<%= dataType.toUpperCase() %>
          },
        <% }) %>

        <% _.each(associations, function (assocType, assocModel) { %>
          <% if (assocType === 'belongsTo') { %>
            <%= assocModel.toLowerCase() + "_id" %>: {
                type: Sequelize.INTEGER,
                references: {
                    model: '<%= assocModel %>',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            }
          <% } %>
        <% }) %>

        <%= createdAt %>: {
          allowNull: false,
          type: Sequelize.DATE
        },

        <%= updatedAt %>: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('<%= tableName %>');
  }
};
