'use strict';

angular.module('app').controller("UserController", function ($injector, $scope, $mdToast, $mdDialog, userService) {

    $injector.invoke(AbstractController, this, {$scope: $scope});

    var vm = this;

    vm.users = [];
    vm.currentUser = {};
    vm.page = {};
    vm.controlPagination;

    vm.load = load;
    vm.save = save;
    vm.remove = remove;
    vm.resetForm = resetForm;
    vm.changeEdit = changeEdit;

    $scope.init = function (state, params) {
        vm.load();
        vm.page = {'number': 0, 'limit': 6, 'content': []};
        vm.controlPagination = new ControlPagination(vm.page, vm.load);
    };

    /**
     Carrega os usuários cadastrados.

     Caso o servidor responda aconteça algum erro ao carregar os dados,
     apresenta uma mensagem de erro para o usuário.
     **/
    function load() {
        userService.load(vm.page).then(function (res) {
            if (res.status === 200) {
                vm.page = res.data;
                vm.controlPagination.page = vm.page;
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(res)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }
        })
    };

    /**
     Método de save de usuários.

     Caso dê sucesso ao tentar salvar um novo usuário, aparece uma mensagem de OK,
     senão aparece uma mensagem de erro para o usuário.

     Depois carrega os usuários novamente para atualizar a lista de usuários.
     **/
    function save() {
        if ($scope.form.$valid) {
            userService.save(vm.currentUser).then(function (res) {
                if (res.status === 200) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res.status === 200 ? 'Usuário criado!' : res)
                            .position('bottom right')
                            .hideDelay(3000)
                    );

                    //recarrega os usuários
                    vm.load();

                    //reseta o formulário
                    vm.resetForm();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(res)
                            .position('bottom right')
                            .hideDelay(3000)
                    );
                }
            })
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Preencha o formulário corretamente!!!")
                    .position('bottom right')
                    .theme("warn")
                    .hideDelay(3000)
            );
        }
    };
    /**
     Exclui um registro.

     Mostra uma popup de confirmação para o usuário o alertando sobre os riscos de deletar o registro.

     Ao confirmar a operação, chama o serviço de exclusão.
     Caso a operação seja realizada informa o usuário que o registro foi excluído e depois recarrega a lista de usuários.
     Senão avisa o usuário que ocorreu erros ao tentar excluir o registro.
     **/
    function remove(id, event) {
        var confirm = $mdDialog.confirm()
            .title('Deseja realmente excluir?')
            .textContent('Atenção! Esta operação não poderá ser desfeita.')
            .targetEvent(event)
            .ok('Sim!')
            .cancel('Não!');
        $mdDialog.show(confirm).then(function () {
            userService.delete(id).then(function (res) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(res.status === 200 ? 'Usuário excluído!' : res)
                        .position('bottom right')
                        .hideDelay(3000)
                );

                vm.load();
            });
        }, function () {
        });
    };

    /**
     Cancela a edição ou cadastro de um novo registro.

     Limpa a variavel para apagar os dados dos campos e reseta o formulário para retirar as mensagens.
     **/
    function resetForm() {
        vm.currentUser = {}

        //reseta o formulário
        $scope.form.$rollbackViewValue();
        $scope.form.$setPristine(); //Set pristine state
        $scope.form.$setUntouched(); //Set state from touched to untouched
    }

    /**
     Habilita a edição de um registro

     Faz a busca pelo registro com o ID informado, e popula os campos do formulário.
     Caso não seja encontrado um registro, informa o usuário que ocorreu um problema.
     **/
    function changeEdit(id) {
        userService.find(id).then(function (res) {
            if (res.status === 200)
                vm.currentUser = res.data;
            else {
                $mdToast.simple()
                    .textContent('Erro ao obter o usuário com <b>id: ' + id + '<b> !')
                    .position('bottom right')
                    .hideDelay(3000)
            }
        });
    }
});