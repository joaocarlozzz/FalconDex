<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Emprestimo.aspx.cs"
    Inherits="Pages_Techs_Emprestimo" Title="Emprestimo" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="head">
    <title>Empréstimo</title>
</asp:Content>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">
    <div class="col">
        <div class="p-3">

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#novoEmprestimo">
                <span class="fa fa-plus mr-2"></span>Novo Empréstimo
            </button>

            <div class="modal fade" id="novoEmprestimo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Registrar Empréstimo</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form3">
                                
                                <div class="form-group">
                                    <label for="emp_equipamento">Equipamento</label>
                                    <select id="emp_equipamento" required="required" class="form-control"></select>
                                    <small class="form-text text-muted">
                                        <span id="equipamentoHelp" data-source="emp_equipamento">Selecione o equipamento</span>
                                    </small>
                                </div>

                                <div class="form-group">
                                    <label for="emp_solicitante">Soliitante</label>
                                    <select id="emp_solicitante" required="required" class="form-control"></select>
                                    <small class="form-text text-muted">
                                        <span id="solicitanteHelp" data-source="emp_equipamento">Selecione o usuário solicitante</span>
                                    </small>
                                </div>

                                <div class="form-group">
                                    <label for="emp_data">Data</label>
                                    <input type="date" id="emp_data" required="required" class="form-control"></input>
                                    <small class="form-text text-muted">
                                        <span id="dataHelp" data-source="emp_equipamento">Selecione a data do empréstimo</span>
                                    </small>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" form="form3" class="btn btn-primary" id="btnLocal">Registrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 d-flex flex-wrap" id="local-label"></div>
        <div class="overflow-hidden">
            <table id="table_Emprestimo" class=" p-3  flex-wrap display table">
                <thead>
                    <tr class="odd">
                        <th>Equipamento</th>
                        <th>Solicitante</th>
                        <th>Data</th>
                        <th>Técnico</th>

                    </tr>
                </thead>
                <tbody id="label_emprestimo">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Equipamento</th>
                        <th>Solicitante</th>
                        <th>Data</th>
                        <th>Técnico</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <script type="module" src="misc/Emprestimo.js"></script>

</asp:Content>
