<template>
<div class="search">
    <div class="scrollBox">
        <label  :for="name">{{name}}</label>
        <input type="search" :placeholder="placeholderText" :name="name" :style="'padding-left:' + paddingPins + 'px'">

        <ul class="selectedPins" v-show="selectedPins.length > 0">
            <input-pin 
                v-for="pin in selectedPins" 
                :key="pin" 
                deletable
                @delete="removePin(pin)"
            >{{pin}}</input-pin>
        </ul>
    </div>

    <ul class="predict layer02dp" v-show="isThereAnyResult" >
        <input-pin 
            v-for="prediction in predictions" 
            :key="prediction" 
            @select="selectPin(prediction)"
        >{{prediction}}</input-pin>
    </ul>
</div>
</template>

<script>
import inputPin from '@/components/atoms/inputPin'

export default {
    name: 'InputSearch',
    components: {
        'input-pin' : inputPin
    },
    props:{
        name: {
            type: String,
            required: false
        },
        autocomplete: {
            type: Boolean,
            required: false
        }
    },
    data(){
        return {
            tags: [],
            paddingPins: 0,
            selectedPins : [],
            predictions : [],
            list: [
                'Michel Barnier',
                'Michel Tout court',
                'Alexandre Aster',
                'Stéphane',
                'Zimbra',
                'yougoslavie',
                'hector',
                'arthur',
                'kaamelott',
                'perceval',
                'provencal',
                'super',
                'top',
                'cool'
            ]
        }
    },
    methods:{
        typingInSearch(inputValue){
            if (inputValue.length >= 1){
                let filteredlist = this.list;
                this.selectedPins.forEach(pin => {
                    filteredlist.splice(filteredlist.findIndex(item => item == pin), 1)
                })

                this.predictions = filteredlist.filter( tag => { // create list of according items
                    let chaine = tag.toLowerCase().split(inputValue.toLowerCase()) ;
                    return chaine.length > 1 ;
                })

                this.predictions = this.predictions.map(prediction => prediction.split(inputValue).join(`<em>${inputValue}</em>`))
            } else {
                this.predictions = []
            }
        },
        selectPin(pinValue){
            this.selectedPins.push(pinValue.split('<em>').join('').split('</em>').join(''));
            this.resetPredictions();
            this.transformInput();
        },
        resetPredictions(){
            this.$el.children[0].children[1].value = '';
            this.predictions = [];
            this.transformInput();
        },
        transformInput(){
            if (this.selectedPins.length >= 1){
                this.$nextTick( () => {
                    let ul = this.$el.children[0].children[2]
                    this.paddingPins = Array.from(ul.children).reduce( (acc, cur) => acc += cur.getBoundingClientRect().width + 10, 0);
                    
                    if(ul.getBoundingClientRect().width > ul.parentElement.getBoundingClientRect().width - 100){
                        console.log(ul.scrollLeft)
                        ul.scroll(100, 0)
                    }
                })
            }
        },
        removePin(pinValue){
            this.selectedPins.splice(this.selectedPins.findIndex(pin => pinValue == pin), 1);
            this.transformInput();
        }
    },
    computed:{
        placeholderText(){
            if (this.$slots) return 'Rechercher un pin...' ;
            return this.$slots.default[0].text ;
        },
        isThereAnyResult(){
            return this.predictions.length >= 1 ;
        }
    },
    mounted(){
        if (this.autocomplete){
            this.$el.children[0].children[1].oninput = (e) => {
                this.typingInSearch(this.$el.children[0].children[1].value);

            }
        }
    },
}
</script>

<style scoped lang="scss">
.search{
    z-index:2;
    position:relative;
    border: $r-color-light01 1px solid;
    box-shadow:$r-shadow-02dp; 
    border-radius: 8px;

    .scrollBox{
        position:relative;
        overflow-x:hidden;
        padding: 10px 15px 10px 15px;
    }

    label{
        font-size:.98em;
        font-weight:200;
        color: $r-color-dark05;
    }

    input{
        position:relative;
        width:100%;
        height: max-content;
        padding-top:10px;

        border:none;
        // background: url('../../assets/icons/search.svg') no-repeat center left 16px;
        background:none;

        color:$r-color-light01;
        font-weight:500;
        font-size:1em;

        &::placeholder{
            color: $r-color-light01;
        }
    }

    .selectedPins{
        position:absolute;
        bottom:10px;
        left:10px;
        width:max-content;
        height:max-content;
        z-index:3;

        max-width:calc(100% - 20px);
        overflow-x:auto;

        display:flex;
        flex-wrap: nowrap;

        & > * {
            margin-right:10px;
        }

        &::-webkit-scrollbar { // chrome & chrome-based browsers
            display: none;
        }

        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
}

.predict{
    position:absolute;
    top:100%;
    left:0;
    width:100%;
    height:max-content;

    display:flex;
    flex-direction:column;
    padding: 10px;

    // background: $r-layer-02dp;
    border-radius: 1px 1px 8px 8px;

    li {
        width:100%;
        height:max-content;
        padding:10px;
        border-radius:8px;  

        &:hover{
            background: $r-layer-02dp;
        }
    }
}


/*.flexPinsdiv{
    position:relative;
    padding: 10px 15px 10px 15px;
    border: $r-color-light01 1px solid;
    box-shadow:$r-shadow-02dp; 
    border-radius: 8px;

    & > label{
        font-size:.98em;
        font-weight:200;
        color: $r-color-dark05;
    }

    input{
        position:relative;
        width:100%;
        height: max-content;

        border:none;
        background:none;

        color:$r-color-light01;
        font-weight:500;
        font-size:1em;

        &::placeholder{
            color: $r-color-light01;
        }
    }
}
*/
</style>