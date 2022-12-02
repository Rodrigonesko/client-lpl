import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './ProducaoEntrevistas.css'

const ProducaoEntrevistas = () => {

    const [quantidadeMesAno, setQuantidadeMesAno] = useState({})
    const [analistasQuantidadeTotalMes, setAnalistasQuantidadeTotalMes] = useState({})

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/producao/dados`, { withCredentials: true })

            console.log(result);

            setQuantidadeMesAno(result.data.quantidadeMesAno)
            setAnalistasQuantidadeTotalMes(result.data.quantidadeAnalistaMesAno);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-producao-entrevistas-container">
                <div className="producao-entrevistas-container">
                    <div className="title">
                        <h3>Produção Entrevistas</h3>
                    </div>
                    <div className="producao-entrevistas">
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th></th>
                                    {
                                        Object.keys(quantidadeMesAno).map(e => {
                                            return (
                                                <th>{e}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total</td>
                                    {
                                        Object.values(quantidadeMesAno).map(e => {
                                            return (
                                                <td>{e}</td>
                                            )
                                        })
                                    }
                                </tr>
                                <tr>
                                    <td colspan='2'>
                                        <div>
                                            <table border={1}>
                                                <thead>
                                                    <tr>
                                                        <th>Analista</th>
                                                        <th>Quantidade</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Object.keys(analistasQuantidadeTotalMes).map(e => {
                                                            console.log(analistasQuantidadeTotalMes[e]['05/2022']);
                                                            if (analistasQuantidadeTotalMes[e]['05/2022']) {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>{e}</td>
                                                                            <td>{analistasQuantidadeTotalMes[e]['05/2022']}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colspan='30'>
                                                                                <div>
                                                                                    <table border={1}>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th></th>
                                                                                                <th>01</th>
                                                                                                <th>02</th>
                                                                                                <th>03</th>
                                                                                                <th>04</th>
                                                                                                <th>05</th>
                                                                                                <th>06</th>
                                                                                                <th>07</th>
                                                                                                <th>08</th>
                                                                                                <th>09</th>
                                                                                                <th>10</th>
                                                                                                <th>11</th>
                                                                                                <th>12</th>
                                                                                                <th>13</th>
                                                                                                <th>14</th>
                                                                                                <th>15</th>
                                                                                                <th>16</th>
                                                                                                <th>17</th>
                                                                                                <th>18</th>
                                                                                                <th>19</th>
                                                                                                <th>20</th>
                                                                                                <th>21</th>
                                                                                                <th>22</th>
                                                                                                <th>23</th>
                                                                                                <th>24</th>
                                                                                                <th>25</th>
                                                                                                <th>26</th>
                                                                                                <th>27</th>
                                                                                                <th>28</th>
                                                                                                <th>29</th>
                                                                                                <th>30</th>
                                                                                                <th>31</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td>quantidade total</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                                <td>18</td>
                                                                                                <td>6</td>
                                                                                                <td>7</td>
                                                                                                <td>10</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>rn</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                                <td>6</td>
                                                                                                <td>5</td>
                                                                                                <td>4</td>
                                                                                                <td>5</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>tele entrevistas</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>1</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                                <td>3</td>
                                                                                                <td>5</td>
                                                                                                <td>12</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>

                                                                )
                                                            }
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProducaoEntrevistas