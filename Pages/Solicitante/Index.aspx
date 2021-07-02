<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Pages_Solicitante_Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link rel="apple-touch-icon" sizes="57x57" href="/img/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/img/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/img/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/img/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/img/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/img/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/img/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/img/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/img/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
    <link rel="manifest" href="/img/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/img/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />

    <link href="~/Content/bootstrap.min.css" rel="stylesheet" />
    <link href="~/Content/font-awesome.min.css" rel="stylesheet" />
    <link href="~/style/Style.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <title>Chamados</title>
</head>
<body>
    <div class="col">
        <div class="row d-flex align-items-center border-bottom">
            <div class="col-1" title="Sair">
                <a href="/index" class="badge badge-light">
                    <i class="fa fa-sign-out fa-2x text-black font-weight-lighter mr-2"></i>Sair
                </a>
            </div>
            <div class="col-10 text-center">
                <h1 class="">Chamados</h1>
            </div>
            <div class="col-1">
                <img class="img-fluid rounded" src="img/android-icon-36x36.png" alt="Logo da Falcon Dex" />
            </div>
        </div>
        <nav aria-label="breadcrumb" class="mt-2">
            <ol class="breadcrumb">
                <span class="mr-2">Você está em:</span>
                <li class="breadcrumb-item active" aria-current="page">Home</li>
            </ol>
        </nav>
        <div class="d-flex p-2 flex-wrap flex-column">
            <form class="form-row" id="form2">
                <div class="col-lg-3">
                    <button type="button" class="btn btn-primary" data-target="#novoChamado" data-toggle="modal">
                        <i class="fa fa-plus"> </i>  Novo chamado
                    </button>
                </div>
                <div class="col-lg-2 form-group">
                    <select id="tipoFiltro" class="form-control"></select>
                </div>
                <div class="col-lg-6">
                    <div class="input-group">
                        <input id="searchInput" type="search" class="form-control" placeholder="Digite para pesquisar"/>
                        <div class="input-group-append">
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
                            <form id="form1">
                                <div class="form-group">
                                    <label for="cha_nome">Título</label>
                                    <input type="text" id="cha_nome" placeholder="Título" class="form-control" maxlength="100" required="required"/>
                                    <small class="form-text text-muted"><span id="nomeHelp" data-source="cha_nome">Por exemplo, Projetor queimado, cabo de rede sem funcionamento</span>
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="descHelp">Descrição</label>
                                    <textarea id="cha_descricao" class="form-control" maxlength="300" required="required"></textarea>
                                    <small class="form-text text-muted"><span id="descHelp" data-source="cha_descricao">Descrição do chamado</span>
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
                                    <label for="locTipo">Local</label>
                                    <select id="locTipo" required="required" class="form-control"></select>
                                </div>
                                <div class="form-group">
                                    <label for="priTipo">Prioridade</label>
                                    <select id="priTipo" required="required" class="form-control"></select>
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
            <div class="d-flex flex-wrap" id="chamados-cards"></div>
        </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="feedbackModal" tabindex="-1" role="dialog" aria-labelledby="encerrarModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="feedbackModalLabel">Feedback</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <form class="rating" name="rating" id="formRating">
                      <label>
                        <input type="radio" name="Feed" value="1" />
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="Feed" value="2" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="Feed" value="3" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>   
                      </label>
                      <label>
                        <input type="radio" name="Feed" value="4" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                      <label>
                        <input type="radio" name="Feed" value="5" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                      </label>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="submit" form="formRating" class="btn btn-primary" id="chamado-feedback">Concluir</button>
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
                                <i class="slider-close fa fa-close fa-3x"></i>
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
                    <i class="fa fa-mouse-pointer mr-1"></i><span class="font-weight-light">Feedback </span><input type="range" id="slider-feed" min="0" max="5" step="1" disabled="disabled" />
                </div>
            </div>
        </div>
    <script src="Scripts/jquery-3.5.1.slim.min.js"></script>
    <script type="module" src="Scripts/popper.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <script type="module" src="misc/ChamadosSolicitante.js"></script>
    <script type="text/javascript">
        $("#form1").submit(function (e) {
            $('#novoChamado').modal('hide');
        });
    </script>
</body>
</html>
