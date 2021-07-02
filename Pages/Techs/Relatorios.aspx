<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Relatorios.aspx.cs"
    Inherits="Pages_Techs_Relatorios" Title="Relatorios" %>

<asp:Content
    runat="server"
    ContentPlaceHolderID="head">
    <title>Relatorios</title>
</asp:Content>

<asp:Content
    runat="server"
    ContentPlaceHolderID="ContentPlaceHolder1">

    <div class="border p-3 d-flex justify-content-between flex-column rounded">
        <div id="accordion">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h4 class="mb-0">
                    <button class="btn btn-dark" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i class="fa fa-clipboard mr-3"></i>Relatório de manutenção externa
                    </button>
                    </h4>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <form class="border-top mt-2" id="form1" name="form1">
                      <div class="form-row">
                          <div class="form-group col-md-4">
                            <label for="txtItem">Item</label>
                            <input type="text" class="form-control" id="txtItem" name="item" placeholder="Projetor Epson" maxlength="50" required>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="txtSerie">Nª Série</label>
                            <input type="text" class="form-control" id="txtSerie" name="nSerie" placeholder="000000-00000" maxlength="50" required>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="selectLocal">Local da retirada</label>
                            <select class="form-control" id="selectLocal" name="local" required></select>
                        </div>
                      </div>
                      <div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="textAreaProblema">Problema</label>
                            <textarea class="form-control" id="textAreaProblema" rows="3" required name="problema"></textarea>
                          </div>
                          <div class="form-group col-md-6">
                            <label for="textAreaDescricao">Descrição</label>
                            <textarea class="form-control" id="textAreaDescricao" rows="3" required name="descricao"></textarea>
                          </div>
                      </div>
                       <button type="submit" class="btn btn-primary" id="btnManutencao">Gerar relatório</button>
                    </form>
                  </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                  <h4 class="mb-0">
                    <button class="btn btn-dark collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <i class="fa fa-clipboard mr-3"></i>Relatório de solicitação de material
                    </button>
                  </h4>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div class="card-body">
                    <form class="border-top mt-2" id="form2" name="form2">
                      <div class="form-row">
                          <div class="form-group col-md-4">
                            <label for="txtMaterial">Itens</label>
                            <input type="text" class="form-control" id="txtMaterial" name="itens" placeholder="Açucar, Cabo de rede RJ-45" maxlength="50" required>
                              <small id="passwordHelpBlock" class="form-text text-muted">
                                Separe os items por um ponto-e-vírgula. ";"
                              </small>
                          </div>
                          <div class="form-group col-md-4">
                            <label for="selectSolicitante">Usuário solicitante</label>
                            <select class="form-control" id="selectSolicitante" name="solicitante" required>
                                <option value="Bruno" selected>Bruno</option>
                            </select>
                        </div>
                      </div>
                       <button type="submit" class="btn btn-primary" id="btnMaterial">Gerar relatório</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="/misc/Relatorios.js"></script>
</asp:Content>