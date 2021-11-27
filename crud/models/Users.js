const { Schema, model } = require('mongoose');

const CountrySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'El Nombre del Pais obligatorio'],
    },
    iso: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('CountrySchema', CountrySchema);

const UsersSchema = Schema({
  name: {
    type: String,
    required: [true, 'El Nombre es obligatorio'],
  },
  age: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
  country: CountrySchema,
  user: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = model('Users', UsersSchema);
