<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Chamado.aspx.cs"
    Inherits="Pages_Techs_Chamado" Title="Chamado" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">
    <div class="d-flex flex-lg-row flex-column">
    <form class="form w-lg-50 h-lg-50 vh-25" id="form2" style="overflow-y: auto">
        <div class="form-group position-sticky" style="top: 0; flex: 3; background-color: white">
            <button type="button" class="btn btn-primary" data-target="#novoChamado" data-toggle="modal">
                <i class="fa fa-plus"> </i>  Novo chamado
            </button>
        </div>
        <div class="form-group">
            <label for="tipoQuantidade" class="form-label"><i class="fas fa-sort-amount-down mr-2"></i>Registros</label>
            <select id="tipoQuantidade" class="form-control form-control-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
        <div class="form-group">
            <label for="tipoFiltro" class="form-label">Estados</label>
            <select id="tipoFiltro" class="form-control form-control-sm"></select>
        </div>
        <div class="form-group">
            <label for="tipoEquipamento" class="form-label">Tipo de equipamento</label>
            <select id="tipoEquipamento" class="form-control form-control-sm"><option value="">Selecione</option></select>
        </div>
        <div class="form-group">
            <label for="tipoLocal" class="form-label">Local</label>
            <select id="tipoLocal" class="form-control form-control-sm"><option value="">Selecione</option></select>
        </div>
        <div class="form-group">
            <label for="tipoAtendente" class="form-label">Atendente</label>
            <select id="tipoAtendente" class="form-control form-control-sm"><option value="">Selecione</option></select>
        </div>
        <div class="form-group">
            <label for="tipoPrioridade" class="form-label">Prioridade</label>
            <select id="tipoPrioridade" class="form-control form-control-sm"><option value="">Selecione</option></select>
        </div>
        <div class="form-group">
            <label for="tipoPeriodo" class="form-label">Período</label>
            <div class="input-group">
              <input type="text" placeholder="Inicio" aria-label="Date" class="form-control form-control-sm start-date" style="width: 1rem" data-toggle="datepicker" id="datePicker1">
              <input type="text" placeholder="Fim" aria-label="Date" class="form-control form-control-sm end-date" style="width: 1rem" data-toggle="datepicker"  id="datePicker2">
            </div>
            <button type="button" id="cleanDates" class="btn btn-light mt-2">
                <i class="fa fa-eraser"> </i> Limpar datas
            </button>
        </div>
        <div>
            <label for="searchInput">Termo específico, aperte enter para pesquisar</label>
            <div class="input-group">
                <input id="searchInput" type="search" class="form-control form-control-sm" placeholder="Digite para pesquisar"/>
                <div class="input-group-append ">
                    <div class="input-group-text"><i class="fa fa-search"></i></div>
                </div>
            </div>
        </div>
    </form>
    <!-- Abrir chamado -->
    <div class="modal fade" id="novoChamado" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Criar chamado</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form1" name="form1">
                        <div class="form-group">
                            <label for="cha_nome">Título</label>
                            <input type="text" id="cha_nome" name="Nome" placeholder="Título" class="form-control" maxlength="100" required="required"/>
                            <small class="form-text text-muted"><span id="nomeHelp" data-source="cha_nome">Por exemplo, Projetor queimado, cabo de rede sem funcionamento</span>
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="descHelp">Descrição</label>
                            <textarea id="cha_descricao" name="Descricao" class="form-control" maxlength="300" required="required"></textarea>
                            <small class="form-text text-muted"><span id="descHelp" data-source="cha_descricao">Descrição do chamado</span>
                            </small>
                        </div>
                        <div class="form-group">
                            <label for="equiTipo">Equipamento</label>        
                            <select id="equiTipo" required="required" class="form-control" name="equipamento.ID"></select>
                        </div>
                        <div class="form-group">
                            <label for="locTipo">Local</label>
                            <select id="locTipo" required="required" class="form-control" name="Local.Id"></select>
                        </div>
                        <div class="form-group">
                            <label for="priTipo">Prioridade</label>
                            <select id="priTipo" required="required" class="form-control" name="prioridade.Id"></select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="submit" class="btn btn-primary" id="btnChamado" form="form1">Solicitar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="w-lg-50 h-75" style="flex: 5">
        <div class="d-flex flex-column" style="position: sticky; top: 0;z-index: 10;background-color: white">
            <div class="bd-highlight form-row">
                <label for="orderSelection" class="col-sm-2 col-form-label">Ordenação</label>
                <div class="col-sm-4">
                    <select class="form-control" aria-label="Default select example" id="orderSelection">
                        <option selected>Selecione</option>
                        <option value="1">Ordenar do mais recente para o mais antigo</option>
                        <option value="2">Ordenar do mais antigo para o mais recente</option>
                        <option value="3">Ordenar de A-Z</option>
                        <option value="4">Ordenar de Z-A</option>
                    </select>
                </div>
            </div>
            <div id="paginationArea" class="d-flex justify-content-center mt-2"></div>
        </div>
        <div class="d-flex flex-wrap justify-content-center" id="chamados-cards"></div>
    </div>
       
    <!-- Modal -->
    <div class="modal fade" id="atenderModal" tabindex="-1" role="dialog" aria-labelledby="encerrarModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="atenderModalLabel">Deseja atender o chamado?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
            <button type="button" class="btn btn-primary" id="chamado-atender">Atender</button>
            </div>
        </div>
        </div>
    </div>
    <div class="modal fade" id="encerrarModal" tabindex="-1" role="dialog" aria-labelledby="encerrarModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="encerrarModalLabel">Deseja encerrar o chamado?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
            <button type="button" class="btn btn-primary" id="chamado-encerrar">Encerrar</button>
            </div>
        </div>
        </div>
    </div>
    <div class="slider row" id="slider">
        <div class="slider-content col-lg-6">
            <div class="slider-body">
                <div class="slider-header d-flex justify-content-between pt-2">
                    <div class="slider-header-text">
                        <h2 id="slider-title">Nome</h2>
                        <h4 id="slider-description" class="text-muted">Descricao</h4>
                    </div>
                    <div class="slider-header-close">
                        <a href="#" id="slider-close" class="badge badge-light">
                            <i class="slider-close fa fa-times fa-3x"></i>
                        </a>
                    </div>
                </div>
                <i class="fa fa-user mr-1"></i><span class="font-weight-light">Aberto por: </span><p id="slider-opener" class="border-bottom">{abridor}</p>
                <i class="fa fa-laptop mr-1"></i><span class="font-weight-light">Equipamento: </span><p id="slider-equipament" class="border-bottom">{equipamento}</p>
                <i class="fa fa-map-marker mr-1"></i><span class="font-weight-light">Local: </span><p id="slider-local" class="border-bottom">{Local}</p>
                <i class="fa fa-user mr-1"></i><span class="font-weight-light">Responsavel: </span><p id="slider-resposavel" class="border-bottom">{Responsavel}</p>
                <i class="fa fa-warning mr-1"></i><span class="font-weight-light">Prioridade: </span><p id="slider-prioridade" class="border-bottom">{prioridade}</p>
                <i class="fa fa-calendar mr-1"></i><span class="font-weight-light">Data de abertura: </span><p class="border-bottom"><time id="slider-data">{Data}</time></p>
                <i class="fa fa-eye mr-1"></i><span class="font-weight-light">Status: </span><p id="slider-status" class="border-bottom">{status}</p>
                <i class="fa fa-mouse-pointer mr-1"></i><span class="font-weight-light">Feedback </span><input type="range" id="slider-feed" min="0" max="5" step="1" disabled>
            </div>
        </div>
     </div>  
    <script type="module" src="misc/Chamados.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.css" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.css"></noscript>
    </div>
</asp:Content>