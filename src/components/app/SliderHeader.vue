<template>
  <section id="slider_header">
    <div class="py-6 px-10 mx-6 mt-6 content">
      <div class="h3">The Filecoin Stack</div>
      <div class="description">The Filecoin stack allows storage and retrieval of the most important data. It is a set
        of modular components to build an open, composable Metaverse. The modularity provides flexibility for teams to
        pick and choose the components they need.
      </div>
    </div>
    <div class="py-6 px10 mx-6 mt-2 content">
      <v-row dense>
        <v-col cols="6">
          <div class="slider_tab">
            <div class="image-container">
              <div class="image">
                <img src="/images/head-sideways.svg" />
                <div class="label">Tools</div>
              </div>
              <div class="image last">
                <img src="/images/spacetime-vortex.svg" />
                <div class="label">Protocols</div>
              </div>
            </div>
            <div class="ml-2 tab-container">
              <div class="tab" v-for="item in items">
                <div class="label" v-text="item.name" />
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="tab-content">
            <div class="h3">nft.storage</div>
            <div class="description">NFT.storage is designed for NFT developers who want free, multi-generational,
              decentralized storage on IPFS and Filecoin.
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
export default {
  name: "SliderHeader",
  data () {
    return {
      tab: null,
      items: [
        {
          name: "nft.storage",
          description: "NFT.storage is designed for NFT developers who want free, multi-generational, decentralized storage on IPFS and Filecoin."
        },
        {
          name: "web3.storage",
          description: "Web3.Storage is a general-purpose Filecoin & IPFS storage service with familiar and simple interfaces offering production-level storage and retrieval that is reliable and performant."
        },
        {
          name: "estuary",
          description: "Estuary is an open source software that allows the easy sending of public data to the Filecoin network, which can be retrieved from anywhere."
        },
        {
          name: "filecoin",
          description: "Filecoin, built on top of IPFS, is the world’s *largest* distributed storage network powered by robust crypto-economic incentives, and enforced via zero knowledge proofs. Filecoin guarantees data persistence, and complements IPFS."
        },
        {
          name: "IPFS",
          description: "IPFS is a distributed system for storing and accessing files, data assets, applications, and data. IPFS knows how to find what you ask for, by using its content address rather than its location - regardless of where the content is stored. Ideal for quick and secure data retrieval."
        },
        {
          name: "IPLD",
          description: "A data model of the content-addressable web - allowing us to treat all hash-linked data structures as subsets of a unified information space. IPLD enables verifiable linking, regardless of where content ultimately resides. It is a core building block for an interoperable Metaverse."
        },
        {
          name: "Libp2p",
          description: "A modular system of protocols, specifications, and libraries that enable the development of peer-to-peer network applications. Trusted by Polkadot and Ethereum 2.0"
        },
        {
          name: "more",
          description: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 1.875rem;
  border: 1px solid #fff;

  .description {
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 0;
  }
}

#slider_header {
  padding: 1.375rem 0;
  margin-bottom: 0.75rem;
  position: relative;
}

.image {
  margin-bottom: 2.125rem;
  height: calc(13.5rem + 4px);
  border: 1px solid #fff;
  border-radius: 1.875rem;
  padding: 1.125rem;
  position: relative;

  img {
    margin: 0;
    padding: 0 1rem;
    display: block;
    width: 100%;
    user-select: none;
  }

  .label {
    margin-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: 400;
    text-align: center;
  }
}

.image.last {
  height: 20rem;
}

.slider_tab {
  display: flex;
  margin-left: 5rem;
}

.tab-container {
  flex-grow: 1;
}

.tab {
  position: relative;
  display: flex;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 1.875rem;
  padding: 0.625rem 1rem;
  width: 100%;
  margin-bottom: 0.625rem;
  background: linear-gradient(-110deg, #fff, #fff 33%, #ffb26b 54.78%, #ffa959 66%, #ffa959);
  background-size: 300%;
  background-position: 100% 0;
  transition: .25s ease;

  .label {
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.1;
    transition: .25s ease-in-out;
    z-index: 1;
  }

  &:hover {
    background-position: 50% 0;
  }

  &:before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: #160000;
    border-radius: inherit;
  }
}

.tab-content {
  padding: 0 2rem;
}
</style>
