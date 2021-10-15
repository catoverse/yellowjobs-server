const categoriesRaw = require("../data/roles.json");
const categories = Object.keys(categoriesRaw).map((category) => ({
  category,
  roles: Object.keys(categoriesRaw[category]),
}));


const find = async ({ limit, offset, name }) => {
  if (name) {
    const category = Object.keys(categoriesRaw).find((cat) => cat === name);
    if (!category) throw new Error("category not found");

    const roles = Object.keys(categoriesRaw[category]);

    return { category, roles };
  }

  return categories.slice(offset, limit);
};

module.exports = {
  //	incVisits,
  //	flush,
  find,
};
