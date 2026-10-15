import {
  Search,
  LayoutGrid,
  List,
} from "lucide-react";

function ProductFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  category,
  setCurrentPage,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center">
      {/* Search */}
      <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 transition-colors focus-within:border-blue-500 dark:border-gray-700 dark:bg-gray-800 sm:col-span-3 lg:flex-[2]">
        <Search size={18} className="shrink-0 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search products..."
          className="w-full min-w-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
      </div>

      {/* Category */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setCurrentPage(1);
        }}
        className="col-span-1 min-w-0 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 lg:flex-1"
      >
        <option value="all">All Categories</option>
        {category.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={selectedStatus}
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          setCurrentPage(1);
        }}
        className="min-w-0 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 lg:flex-1"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>

      {/* Sort By */}
      <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 transition-colors focus-within:border-blue-500 dark:border-gray-700 dark:bg-gray-800 sm:col-span-2 lg:flex-1">
        <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
          Sort by
        </span>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full min-w-0 cursor-pointer bg-transparent text-sm text-gray-700 outline-none dark:text-gray-100"
        >
          <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" value="newest">
            Newest
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" value="oldest">
            Oldest
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" value="price-low">
            Price: Low to High
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" value="price-high">
            Price: High to Low
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" value="name">
            Name: A to Z
          </option>
          <option className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100" value="stock">
            Stock: Low to High
          </option>
        </select>
      </div>

      {/* View Controls */}
      <div className="col-span-2 flex items-center gap-2 sm:col-span-2 lg:shrink-0">
        <button
          type="button"
          onClick={() => setViewMode("grid")}
          aria-label="Grid view"
          className={`flex-1 rounded-xl border p-3 transition-colors lg:flex-none ${
            viewMode === "grid"
              ? "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400"
              : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <LayoutGrid size={19} className="mx-auto" />
        </button>

        <button
          type="button"
          onClick={() => setViewMode("list")}
          aria-label="List view"
          className={`flex-1 rounded-xl border p-3 transition-colors lg:flex-none ${
            viewMode === "list"
              ? "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400"
              : "border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <List size={19} className="mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default ProductFilters;