# Setup

Before Node.js run, you need to create MongoDB database with next endpoint:
```mongodb://localhost:27017/chat```

Then, you need to run project:

```bash
npm i
npm run start
```

---

#### Default configurations:

Url: http://localhost:3030
WebSocket endpoint: ws://localhost:5000

---

#### To connect to WebSocket, you need to add `token` parameter in address, like this:
`ws://localhost:5000?token=eyJhbGciOiJIUzI...Hwxc


#### This WebSocket can dispatch event:
```typescript
{
    type: 'message_created' | 'message_updated',

    data: {
        _id: string,
        userId: string,
        content: string,
        createdAt: string,
        updatedAt: string,
    }
}
```

---