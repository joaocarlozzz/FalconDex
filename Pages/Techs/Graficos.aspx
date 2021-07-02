<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Graficos.aspx.cs"
    Inherits="Pages_Techs_Graficos" Title="Gráficos" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">

     <form class="form-inline" id="form1">
        <div class="mt-2 form-group">
            <label for="chartType" class="sr-only">Password</label>
            <select class="form-control" id="chartType" required>
              <option value="1" selected>Salas com mais chamados</option>
              <option value="2">Equipamentos mais movimentados</option>
              <option value="3">Quantidade de atendimentos</option>
              <option value="4">Feedback médio</option>
              <option value="5">Solicitantes com mais chamados</option>
            </select>
        </div>
    </form>

    <canvas id="myChart" class="p-3"></canvas>

    <script type="module" src="../../misc/Graficos.js"></script>
</asp:Content>