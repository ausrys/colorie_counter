module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
          len: {
            args: [3, 20],
            msg: "Username should be between 3 and 20 symbols",
          },
        },
      },
      user_password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email",
          },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );
  return User;
};
