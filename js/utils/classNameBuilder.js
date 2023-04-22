export const classNameBuilder = {
    build: function(...classNames){
        let result = "";

        classNames.map((item)=>{
            result += item + " ";
        });

        return result;
    }
}