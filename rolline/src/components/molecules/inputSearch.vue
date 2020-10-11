<template>
<div class="search">
    <label  :for="name">{{name}}</label>
    <input type="text" :placeholder="placeholderText" :name="name" :style="'padding-left:' + paddingPins">

        <div class="flexPins" v-show="tags.length > 0">
            <input-pin
            :for="name" v-for="(tag, i) in tags" 
            :key="tag + i" 
            >{{tag}}</input-pin>
        </div>

    <ul class="predict" v-show="isThereAnyResult" >
        <tag-pin 
            v-for="(value, key) in results" 
            :key="reactiveKeys + key" 
            :tagName="key"  
            @select="resetInput()">
            </tag-pin>
    </ul>
</div>
</template>

<script>
import tagPin from '@/components/atoms/tagPin'
import inputPin from '@/components/atoms/inputPin'

export default {
    name: 'InputSearch',
    components: {
        'tag-pin' : tagPin,
        'input-pin' : inputPin
    },
    data(){
        return {
            tags: [],
            results: [],
            paddingPins: '0px'
        }
    },
    props:{
        name: {
            type: String,
            required: false
        }
    },
    methods:{
        typingInSearch(inputValue){
            if (inputValue.length >= 1){
                let filteredTags = this.getTagsList.filter( tag => {
                    let chaine = tag.toLowerCase().split(inputValue.toLowerCase()) ;
                    return chaine.length > 1 && chaine[0] == '' ;
                })


                //add new tags to the list
                filteredTags.forEach( tag => {
                    if(!Object.keys(this.results).includes(tag)){
                        let qte = this.howManyContent(tag)
                        if (qte > 0){ // inutile d'afficher un tag qui n'a pas de contenus
                            this.$set(this.results, tag, qte); // set a property through vue otherwise it does not watch the change
                        }
                    }
                })

                // remove those ones which not in
                if (Object.keys(this.results).length > filteredTags.length){ 
                    Object.keys(this.results).forEach( key => {
                        if(!filteredTags.includes(key)){
                            delete this.results[key];
                            this.updateComponent(); // force change after deleting by changing the key of the component
                        }
                    })
                }
            } else {
                this.results = {}
            }
        },
        howManyContent(tag){            
            return this.getList[this.category].filter( content => content.tags.includes(tag)).length
        },
        updateComponent(){
            this.reactiveKeys = Object.keys(this.results).reduce( (acc, curr) => acc += curr.toString(), '');
        },
        resetInput(){
            this.$el.children[0].value = '';
            this.typingInSearch(this.$el.children[0].value);
        }
    },
    computed:{
        placeholderText(){
            if (this.$slots) return 'Dessiner une blanquette avec Processing...' ;
            return this.$slots.default[0].text ;
        },
        isThereAnyResult(){
            return this.tags.length >= 1 ;
        }
    }
}
</script>

<style scoped lang="scss">
.search{
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
        // background: url('../../assets/icons/search.svg') no-repeat center left 16px;
        background:none;

        color:$r-color-light01;
        font-weight:500;
        font-size:1em;

        &::placeholder{
            color: $r-color-light01;
        }
    }

    ul {
        position:relative;
        z-index:1;
        width:100%;
        display:flex;
        flex-flow: wrap;
        padding:20px;
        // transform: translateY(-10px);

        background-color:var(--color-gray01);
        // box-shadow: 0 3px 8px 4px rgba(0,0,0,.12); 
        border: none;
        border-radius: 1px 1px 8px 8px;
    }

    .flexPins{
        position:absolute;
        top:9px;
        left:52px;
        width:max-content;
        height:max-content;
        z-index:9;

        display:flex;
        flex-wrap: wrap;

        & > * {
            z-index:10;
            margin-right:15px;
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