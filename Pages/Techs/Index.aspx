<%@ Page Language="C#" MasterPageFile="~/Pages/Techs/MasterPage.master" 
    AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Pages_Techs_Index" Title="Página Inicial"%>

<asp:content
    runat="server"
    contentplaceholderid="head">
    <title>Página Inicial</title>
</asp:content>

<asp:content
    runat="server"
    contentplaceholderid="ContentPlaceHolder1" >

    <h4>Boa noite, Bruno</h4>
    <hr />
    <div id="chamados-cards" class="d-flex">

    </div>
    <div class="d-flex mt-2">
       
       <div class="col-md-3 border rounded p-3">
                <p class="font-weight-bold">Quantidade de atendimentos</p>
                10
        </div>
        <div class="col-md-3 border rounded ml-3 p-3">
                <p class="font-weight-bold">Feedback médio</p> 5 estrelas
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
        </div>
        <div class="col-md-3 border rounded ml-3 p-3">
                <p class="font-weight-bold">Chamados hoje</p> 5
        </div>
        
    </div>
    <script type="module" src="misc/Inicio.js"></script>
</asp:content>

