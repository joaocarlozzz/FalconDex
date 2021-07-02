<%@ Page Language="C#" MasterPageFile="~/Pages/Techs/MasterPage.master" AutoEventWireup="true" CodeFile="Tecnicos.aspx.cs" Inherits="Tecnicos" Title="Técnicos" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="head">
    <title>Técnicos</title>
</asp:Content>
<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">
    <div class="p-3">
        <button class="btn btn-primary" data-toggle="modal" data-target="#novoUsuario"><i class="fa fa-user-plus mr-3"></i>Novo</button>
    </div>
    <div class="w-100">
    <div class="accordion p-3" id="usuarios-accordion">
        <asp:Repeater ID="RepeaterUsers" runat="server">
            <ItemTemplate>
                <div class="card z-depth-0 bordered motion">
                    <div class="card-header d-flex justify-content-between">
                        <h5 class="mb-0">
                            <button class="btn btn-link badge badge-light" type="button" data-toggle="collapse" data-target="#collapseOne<%#Eval("usu_id") %>"
                                aria-expanded="true" aria-controls="collapseOne<%#Eval("usu_id") %>">
                                <i class="fa fa-user mr-3"></i>
                                <asp:Label ID="lblUser" runat="server" Text='<%#Eval("usu_nome") %>' />
                            </button>
                        </h5>
                        <a href="#" class="text-black badge badge-light"><i class="fa fa-edit fa-2x"></i></a>
                    </div>
                    <div id="collapseOne<%#Eval("usu_id") %>" class="collapse" aria-labelledby="headingOne2"
                        data-parent="#usuarios-accordion">
                        <div class="card-body">
                            E-mail:
                            <asp:Label ID="Label1" runat="server" Text='<%#Eval("usu_email") %>' />
                            Status:
                            <asp:Label ID="Label2" runat="server" Text='<%#Eval("usu_status") %>' />
                            Permissao:
                            <asp:Label ID="Label3" runat="server" Text='<%#Eval("usu_permissao") %>' />
                        </div>
                    </div>
                </div>

            </ItemTemplate>
        </asp:Repeater>
        <div class="modal fade" id="novoUsuario" tabindex="-1" role="dialog" aria-labelledby="novoUsuario" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Criar usuário</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form1">
                                <div class="form-group">
                                    <label for="nomeHelp">Nome</label>
                                    <input type="text" class="form-control" id="txtNome" aria-describedby="nomeHelp" 
                                        placeholder="Nome" required>
                                    <small id="nomeHelp" class="form-text text-muted">Nome simples de usuário</small>
                                </div>
                                <div class="form-group">
                                    <label for="senhaHelp">Senha</label>
                                    <input type="password" maxlength="32" class="form-control" id="txtSenha" aria-describedby="senhaHelp" 
                                        placeholder="Senha" required>
                                    <small id="senhaHelp" class="form-text text-muted">Digite uma senha de 8 a 32 caracteres</small>
                                </div>
                                <div class="form-group">
                                    <label for="senhaHelp2">Repita a senha</label>
                                    <input type="password" maxlength="32" class="form-control" id="txtSenha2" aria-describedby="senhaHelp2" 
                                        placeholder="Senha" required>
                                </div>
                                <div class="form-group">
                                    <label for="perTipo">Permissão</label>
                                    <select class="form-control" id="perTipo" required="required">
                                      <option>Solicitante</option>
                                      <option>Técnico</option>
                                      <option>Admnistrador</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" form="form1" class="btn btn-primary">Criar</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
        </div>
</asp:Content>
