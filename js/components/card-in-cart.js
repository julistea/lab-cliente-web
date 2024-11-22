export default function cardInCart(product) {
  const { id, title, image, quantity, price } = product;
  return /* html */ `
    <article class="flex gap-4 border rounded-xl p-2 bg-white mb-5">
      <img class="h-24 object-cover shrink-0" src="${image}" alt="${title}" />
      <div class="w-full text-right">
        <p class="mb-2">${title}</p>
        <div class="flex items-center justify-end">
          <button class="btn btn-outline btn-primary" id="button-decrement" value="${id}">-</button>
          <span class="font-bold text-lg mx-1.5" id="quantity">${quantity}</span>
          <button class="btn btn-outline btn-primary" id="button-increment" value="${id}">+</button>
          <button type="button" class="btn btn-outline btn-secondary ml-1.5" id="button-delete" value="${id}">
            X
          </button>
        </div>
        <p class="mt-4 font-bold text-lg" id="total">Total: $${(
          price * quantity
        ).toFixed(2)}</p>
      </div>
    </article>
  `;
}
