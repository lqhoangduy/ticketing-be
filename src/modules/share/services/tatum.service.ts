import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { AxiosService } from './axios.service';

interface IMetaData {
  eventId: string;
  userId: string;
}

@Injectable()
export class TatumService {
  constructor(private axiosService: AxiosService) {}

  async generateFlowWallet() {
    const result = await this.axiosService.axiosTatum(`flow/wallet`, 'GET');
    return result;
  }

  async generateAddress(xpub: string, index: number) {
    const result = await this.axiosService.axiosTatum(
      `flow/address/${xpub}/${index}`,
      'GET',
    );
    return result.address;
  }

  async generatePrivateKey(mnemonic: string, index: number) {
    const result = await axios.post(
      `${process.env.TATUM_API_URL}/v3/flow/wallet/priv`,
      {
        mnemonic,
        index,
      },
      {
        headers: {
          'x-api-key': `${process.env.TATUM_API_KEY}`,
        },
      },
    );
    return result.data.key;
  }

  async deployFlowNft(privateKey: string, account: string) {
    const result = await axios.post(
      `${process.env.TATUM_API_URL}/v3/nft/deploy/`,
      {
        chain: 'FLOW',
        privateKey,
        account,
      },
      {
        headers: {
          'x-api-key': `${process.env.TATUM_API_KEY}`,
        },
      },
    );
    return result.data.txId;
  }

  async getContractAddress(txId: string) {
    const result = await this.axiosService.axiosTatum(
      `nft/address/FLOW/${txId}`,
      'GET',
    );
    return result.contractAddress;
  }

  async uploadMetaData(metaData: IMetaData, filename: string) {
    const payload = JSON.stringify(metaData);
    const bufferObject = Buffer.from(payload, 'utf-8');
    const file = new FormData();

    file.append('file', bufferObject, `${filename}.json`);

    const result = await axios.post(
      `${process.env.TATUM_API_URL}/v3/ipfs`,
      file,
      {
        headers: {
          ...file.getHeaders(),
          'x-api-key': `${process.env.TATUM_API_KEY}`,
        },
      },
    );

    const url = `ipfs://${result.data.ipfsHash}/${filename}.json`;
    return url;
  }

  async mintNft(
    address: string,
    url: string,
    contractAddress: string,
    privateKey: string,
  ) {
    const result = await axios.post(
      `${process.env.TATUM_API_URL}/v3/nft/mint/`,
      {
        to: address,
        url,
        contractAddress,
        chain: 'FLOW',
        privateKey,
        account: address,
      },
      {
        headers: {
          'x-api-key': `${process.env.TATUM_API_KEY}`,
        },
      },
    );
    return result.data;
  }
}
