<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Equipamento.aspx.cs"
    Inherits="Pages_Techs_Equipamento" Title="Equipamento" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="head">
    <title>Equipamento</title>
</asp:Content>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">
    <div class="col">
        <div class="p-3">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#novoEquipamento">
                <span class="fa fa-plus mr-2"></span>Novo Equipamento
            </button>
            <div class="modal fade" id="novoEquipamento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Criar Equipamento</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form3">
                                <div class="form-group">
                                    <label for="equ_nome">Nome</label>
                                    <input type="text" class="form-control" id="equ_nome" placeholder="Titulo" maxlength="100" required="required">
                                    <small class="form-text text-muted">
                                        <span id="nomeHelp" data-source="equ_nome">Nome do equipamento de maneira clara</span>
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="equi_patrimonio">Patrimonio</label>
                                    <input type="text" class="form-control" id="equi_patrimonio" placeholder="Patrimonio" maxlength="100" required="required">
                                    <small class="form-text text-muted">
                                        <span id="patrimonioHelp" data-source="equi_patrimonio">Digite o patrimonio como esta no equipamento</span>
                                    </small>
                                </div>


                                <div class="form-group">
                                    <label for="equiTipo">Equipamento</label>
                                    <select id="equiTipo" required="required" class="form-control">
                                        <option value="1">Computador</option>
                                        <option value="2">Cabo</option>
                                        <option value="3">Projetor</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="equ_local">Local</label>
                                    <select id="equ_local" required="required" class="form-control"></select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" form="form3" class="btn btn-primary" id="btnLocal">Criar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 d-flex flex-wrap" id="local-label"></div>
        <div class="overflow-hidden">
            <table id="table_Equipamento" class=" p-3  flex-wrap display table">
                <thead>
                    <tr class="odd">
                        <th>Nome</th>
                        <th>Patrimonio</th>
                        <th>Tipo</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody id="label_equipamento">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Nome</th>
                        <th>Patrimonio</th>
                        <th>Tipo</th>
                        <th>Status</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <script type="module" src="misc/Equipamento.js"></script>

</asp:Content>
