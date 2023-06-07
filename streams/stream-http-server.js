import http from 'node:http'

import { Transform } from 'node:stream'

class UnModuleNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

// req ==> ReadableStream
// res ==> WritableStream

const server = http.createServer((req, res) => {
    return req
        .pipe(new UnModuleNumberStream())
        .pipe(res)
})

server.listen(3334)