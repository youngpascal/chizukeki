import * as React from 'react'
import { Button, CardItem, Body, Text, Card, connectStyle, H2, Icon } from 'native-base/src/index'

import Wrapper from '../generics/Wrapper'
import RoutineButton from '../generics/routine-button'
import Modal from '../generics/modal.web'
import Wallet from '../wallet/Wallet'

import Summary from './Summary'
import DeckList from './DeckList'
import SpawnDeck from './SpawnDeck'


let styles = {
  main: {
    flex: 3,
    minWidth: 325,
    marginTop: -5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
}

function sync(props: Assets.Props){
  let { actions, decks, balances, wallet } = props
  if ((!decks) && wallet) {
    actions.syncDecks({ address: wallet.address })
  }
  if (decks && (!balances)) {
    actions.syncBalances({ address: wallet.address, decks })
  }
}

@connectStyle('PeerKeeper.Assets', styles)
class Assets extends React.Component<Assets.Props, {}> {
  componentDidMount(){
    sync(this.props)
  }
  componentWillReceiveProps(nextProps: Assets.Props){
    sync(nextProps)
  }
  render() {
    let { decks, balances, wallet, actions } = this.props
    return (
      <Wrapper>
        <Summary balances={balances || []}>
          <SpawnDeck wallet={wallet} spawn={actions.spawnDeck} />
        </Summary>
        <DeckList decks={decks || []} />
      </Wrapper>
    )
  }
}

namespace Assets {
  export type Data = {
    decks: DeckList.Data['decks'] | null
    balances: Summary.Props['balances'] | null
  }
  export type Props = Data & {
    wallet: Wallet.Data
    actions: {
      // TODO strange type errors when properly typed
      syncDecks: any
      syncBalances: any
      spawnDeck: any
    }
    style?: any
  }
}

export default Assets
