import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class UnModuleNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

//lê a stream e já escreve ela no terminal
// new OneToHundredStream()
//     .pipe(process.stdout)

/*
lendo dados de uma stream de leitura que recebe número de 1 a 100
vou escrever esses dados em uma stream de escrita, com método pipe(),
*/
// new OneToHundredStream()
//     .pipe(new MultiplyByTenStream())

new OneToHundredStream()
    .pipe(new UnModuleNumberStream())
    .pipe(new MultiplyByTenStream())

/* 
    Stream de escrita recebe dados de uma stream de leitura e faz alguma operação
    process.stdout é um exemplo, ela processa dados e não lê.

    O this.push() no readable lê o chunk, ou o pedaço de informação, 
    que poderá ser capatada pelo método chunk do writable

    Stream de escrita apenas processa dado, não transforma

    O chunk é do tipo buffer

    Não precisa aguardar a leitura completa do arquivo para
    processar tais dados 

    Stream de transformação transformam um chunk em outro dado
    Ele pega o chunk e muda antes de passar para a stream de escrita
    Ele recebe da strema de leitura, transforma e envia para a strema de escrita
    É stream de intermediação

    Buffer é o modelo que o Node usa para transicionar dados entre streams 

    Stream Duplex, arquivo .txt, você pode efetuar leitura e escrita de dados,
    mas não pode trasnformar dados.
*/