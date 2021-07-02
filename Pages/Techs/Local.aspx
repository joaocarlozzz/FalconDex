<%@ Page Language="C#" MasterPageFile="MasterPage.master" CodeFile="Local.aspx.cs" Inherits="Pages_Techs_Local" Title="Local" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="head">
    <title>Local</title>
</asp:Content>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">
    <div class="col">
        <div class="p-3">

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#novoLocal">
                <span class="fa fa-plus mr-2"></span>Novo Local
            </button>

            <div class="modal fade" id="novoLocal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Criar Local</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form2">
                                <div class="form-group">
                                    <label for="loc_nome">Nome</label>
                                    <input type="text" class="form-control" id="loc_nome" placeholder="Titulo" maxlength="100" required="required">
                                    <small class="form-text text-muted">
                                        <span id="nomeHelp" data-source="loc_nome">Nome do local de maneira clara</span>
                                    </small>
                                </div>

                                <div class="form-group">
                                    <label for="tipoBloco">Bloco</label>
                                    <select class="form-control" id="tipoBloco" required="required">
                                        <option value="Bloco A">Bloco A</option>
                                        <option value="Bloco B">Bloco B</option>
                                        <option value="Bloco C">Bloco C</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" form="form2" class="btn btn-primary" id="btnLocal">Criar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-3 d-flex flex-wrap" id="local-label"></div>
        <div class="overflow-hidden">
            <table id="table_Local" class=" p-3  flex-wrap display table">
                <thead>
                    <tr class="odd">
                        <th>Número</th>
                        <th>Nome</th>
                        <th>Bloco</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody id="label_bory">

                </tbody>
                <tfoot>
                    <tr>
                        <th>Número</th>
                        <th>Nome</th>
                        <th>Bloco</th>
                        <th>Status</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

   <script type="module" src="misc/Local.js"></script>
</asp:Content>