class Publisher {
    constructor() {
        if (new.target === undefined) {
            throw new Error('请使用new实例化')
        } else {
            this.subscriberCbCache = {}
        }
    }

    addSubscriber(msg, fn) {
        if (!this.subscriberCbCache[msg]) {
            this.subscriberCbCache = []
        }
        this.subscriberCbCache[msg].push(fn)
    }

    trigger(msg, data) {
        if (!this.subscriberCbCache[msg]) {
            return console.log('unSubscribed message!')
        }
        for (const fn of this.subscriberCbCache[msg]) {
            fn(data)
        }
    }

    delSubscriber(msg, fn) {
        let fnArr = this.subscriberCbCache[msg]
        if (!fnArr) {
            return
        }
        if (!fn) {
            fnArr = []
        } else {
            fnArr = fnArr.filter(_fn => _fn !== fn)
        }
    }
}

let model1 = {
        doSth() {
            console.log('1')
        }
    },
    model2 = {
        doSth() {
            console.log('2')
        },
        doOth(){
            console.log('22')
        }
    },
    model3 = {
    done(){
        setTimeout(()=>{
            publisher1.trigger('click',{})
        },3000)
    }
    }
    publisher1 = new Publisher()

publisher1.addSubscriber('openDoor',fn1 = data =>{
    model1.doSth(data)
})

publisher1.delSubscriber('click',fn2 = data =>{
    model2.doSth(data)
    model2.doOth()
})

model3.done()

publisher1.delSubscriber('openDoor',fn1)