# Code Review

The original code is very close, but there is a small issue: the call to `prisma.user.create()` is **missing an** `await`, which means the resolver returns a **Promise** instead of the actual user object created.

## Changes made

- Added `await` before `prisma.user.create()`.
- Improved readibility and minor factoring

## Optional improvement

In order to handle errors safely, we can wrap the **Prisma** call in a `try-catch` block.

```ts
try {
  const user = await prisma.user.create({ data: { name } });
  return user;
} catch (error) {
  console.error(error);
  throw new Error("Failed to create user");
}
```
