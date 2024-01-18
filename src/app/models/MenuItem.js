import mongoose, { Schema, model, models } from 'mongoose';

const ExtraPriceSchemma = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: String },
    sizes: { type: [ExtraPriceSchemma] },
    extraIngredientPrices: { type: [ExtraPriceSchemma] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
