/*
    Métodos de paginação.

    1) Voltar 1 página.
    2) Ir para página x.
    3) Avançar 1 página.
*/
var ControlPagination = function(page, load){
    this.page = page;
    this.load = load;

    this.back = function(){
        this.page.number--;
        this.load();
    };
    this.forward = function(){
        this.page.number++;
        this.load();
    };
    this.change = function(page){
        this.page.number = page;
        this.load();
    };
    this.pages = function(){
        return new Array(this.page.pages);
    };
    this.isLast = function(){
        return this.page.pages > 2 || this.page.number + 1 == this.page.pages;
    }
};