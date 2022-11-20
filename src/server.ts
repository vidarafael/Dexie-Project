import { createServer } from "miragejs"

interface IItems {
  id: number;
  name: string;
  test: string;
  test_id: string;
}

export default function () {
  const items = createSeeds(20000)
  createServer({
    routes() {
      this.timing = 1000;
      this.get("/api/items", () => ({
        items,
      }))

      this.get("/api/users", () => ({
        users: [
          { id: 1, user: "rafael", password: 'rafael123' },
          { id: 2, user: "vitao", password: 'vitao123' },
          { id: 3, user: "pablo", password: 'pablo123' },
        ],
      }))
    },
  })
}

function createSeeds(numberSeeds: number): IItems[] {
  const itens = [];

  for (let i = 1; i <= numberSeeds; i++) {
    itens.push({
      id: i,
      name: `item ${i}`,
      test: `test ${i}`,
      test_id: `${i} idzim ${i}`
    })
  }

  return itens
}