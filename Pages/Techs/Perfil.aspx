<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Perfil.aspx.cs"
    Inherits="Pages_Techs_Perfil" Title="Perfil" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">

    <div class="m-auto w-50">
        <div class="w-100">
            <div class="text-center">
                 <i class="fa fa-user fa-4x"></i>
            </div>
            <form>
              <div class="form-group">
                <label for="userName">Nome de usuário</label>
                <input type="text" class="form-control" id="userName" placeholder="Nome de exemplo" required>
              </div>
              <div class="form-group">
                <label for="userEmail">E-mail</label>
                <input type="email" class="form-control" id="userEmail" value="joaozinho@gmail.com" readonly required>
              </div>
              <div class="form-group">
                <label for="userPermissao">Permissão</label>
                <input type="text" class="form-control" id="userPermissao" value="Solicitante" readonly required>
              </div>
               <button type="submit" class="btn btn-primary">Alterar</button>
            </form>
        </div>
    </div>
</asp:Content>